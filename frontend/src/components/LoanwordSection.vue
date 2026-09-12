<template>
  <div class="bg-slate-800 rounded-lg p-4 border border-slate-700">
    <div class="flex items-center justify-between mb-1 flex-wrap gap-2">
      <h3 class="text-sm font-bold text-slate-400">借词传播专题 · 跨语系借入路径</h3>
      <div class="flex items-center gap-2 text-xs">
        <span class="text-slate-500">来源语系</span>
        <select v-model="store.loanwordFamily" class="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-300">
          <option value="all">全部</option>
          <option v-for="f in LANGUAGE_FAMILIES" :key="f.id" :value="f.id">{{ f.name }}</option>
        </select>
      </div>
    </div>
    <p class="text-xs text-slate-500 mb-3">悬停或点击传播路径 / 语言节点 / 时间轴圆点，联动标出来源语言与落地时期；路径颜色对应来源语系</p>
    <div class="grid lg:grid-cols-4 gap-4">
      <svg ref="svgRef" class="w-full bg-slate-900 rounded lg:col-span-3"></svg>
      <div>
        <div v-if="activeLoan" class="bg-slate-900 rounded p-3 border border-slate-700">
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-lg font-bold text-cyan-400">{{ activeLoan.word }}</span>
            <span class="text-xs text-slate-500">{{ activeLoan.meaning }}</span>
          </div>
          <div class="space-y-2 text-xs">
            <div class="bg-slate-800 rounded p-2">
              <div class="text-slate-500 mb-1">来源语言</div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: FAMILY_COLORS[activeLoan.sourceFamily] }"></span>
                <span class="font-bold">{{ activeLoan.sourceLang }}</span>
                <span class="text-slate-500">{{ familyName(activeLoan.sourceFamily) }}</span>
              </div>
              <div class="font-mono text-slate-400 mt-1">{{ activeLoan.sourceWord }}</div>
            </div>
            <div class="bg-slate-800 rounded p-2">
              <div class="text-slate-500 mb-1">落地语言 · 落地时期</div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :style="{ backgroundColor: FAMILY_COLORS[activeLoan.targetFamily] }"></span>
                <span class="font-bold">{{ activeLoan.targetLang }}</span>
                <span class="bg-amber-400 text-slate-900 font-bold rounded px-1.5 py-0.5">{{ activeLoan.period }}</span>
              </div>
            </div>
            <div class="bg-slate-800 rounded p-2">
              <div class="text-slate-500 mb-1">传播路径</div>
              <div class="flex items-center gap-1 flex-wrap">
                <template v-for="(step, i) in activeLoan.route" :key="i">
                  <span class="bg-slate-900 border border-slate-600 rounded px-1.5 py-0.5">{{ step }}</span>
                  <span v-if="i < activeLoan.route.length - 1" class="text-slate-500">→</span>
                </template>
              </div>
            </div>
            <div v-if="activeLoan.note" class="text-slate-500 px-1">{{ activeLoan.note }}</div>
          </div>
        </div>
        <div v-else-if="hoverLangStats" class="bg-slate-900 rounded p-3 border border-slate-700">
          <div class="flex items-center gap-1.5 mb-2">
            <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: FAMILY_COLORS[hoverLangStats.family] }"></span>
            <span class="text-lg font-bold text-cyan-400">{{ hoverLangStats.name }}</span>
            <span class="text-xs text-slate-500">{{ familyName(hoverLangStats.family) }}</span>
          </div>
          <div class="text-xs text-slate-400 mb-2">{{ hoverLangStats.side === 'source' ? '借出方' : '借入方' }} · {{ hoverLangStats.count }} 个借词</div>
          <div class="flex flex-wrap gap-1">
            <span v-for="w in hoverLangStats.words" :key="w" class="bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-xs font-mono">{{ w }}</span>
          </div>
        </div>
        <div v-else class="bg-slate-900 rounded p-3 border border-slate-700">
          <h4 class="text-xs font-bold text-slate-400 mb-2">专题概览</h4>
          <div class="grid grid-cols-2 gap-2 text-center">
            <div class="bg-slate-800 rounded p-2"><div class="text-lg font-bold text-cyan-400">{{ overview.total }}</div><div class="text-xs text-slate-500">借词样本</div></div>
            <div class="bg-slate-800 rounded p-2"><div class="text-lg font-bold text-green-400">{{ overview.langs }}</div><div class="text-xs text-slate-500">涉及语言</div></div>
            <div class="bg-slate-800 rounded p-2"><div class="text-lg font-bold text-orange-400">{{ overview.pairs }}</div><div class="text-xs text-slate-500">跨语系方向</div></div>
            <div class="bg-slate-800 rounded p-2"><div class="text-lg font-bold text-purple-400">4</div><div class="text-xs text-slate-500">覆盖语系</div></div>
            <div class="col-span-2 bg-slate-800 rounded p-2 text-left"><span class="text-xs text-slate-500">时间跨度：</span><span class="text-xs font-bold text-amber-400">{{ overview.span }}</span></div>
          </div>
          <p class="text-xs text-slate-500 mt-2">点击任意路径或时间轴圆点查看借词详情，再次点击取消选中</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import * as d3 from 'd3'
import { useEtymologyStore, LANGUAGE_FAMILIES, LOANWORD_PATHS } from '../store/etymology'
import type { LoanwordPath } from '../types'

const store = useEtymologyStore()
const svgRef = ref<SVGSVGElement | null>(null)
const hoverId = ref<string | null>(null)
const hoverLang = ref<{ name: string; side: 'source' | 'target' } | null>(null)

const FAMILY_COLORS: Record<string, string> = Object.fromEntries(LANGUAGE_FAMILIES.map(f => [f.id, f.color]))
const familyName = (id: string) => LANGUAGE_FAMILIES.find(f => f.id === id)?.name ?? id
const langFamilyOf = (name: string) => {
  const hit = LOANWORD_PATHS.find(l => l.sourceLang === name || l.targetLang === name)
  return hit ? (hit.sourceLang === name ? hit.sourceFamily : hit.targetFamily) : ''
}

// 联动高亮集合: 语言节点悬停时展开为该语言的全部借词
const activeIds = computed<Set<string>>(() => {
  if (hoverLang.value) {
    const { name, side } = hoverLang.value
    return new Set(store.filteredLoanwords.filter(l => side === 'source' ? l.sourceLang === name : l.targetLang === name).map(l => l.id))
  }
  const id = hoverId.value ?? store.selectedLoanwordId
  return id ? new Set([id]) : new Set()
})
const activeLoan = computed<LoanwordPath | null>(() => {
  if (hoverLang.value) return null
  const id = hoverId.value ?? store.selectedLoanwordId
  return LOANWORD_PATHS.find(l => l.id === id) ?? null
})
const hoverLangStats = computed(() => {
  if (!hoverLang.value) return null
  const { name, side } = hoverLang.value
  const list = store.filteredLoanwords.filter(l => side === 'source' ? l.sourceLang === name : l.targetLang === name)
  return { name, side, family: langFamilyOf(name), count: list.length, words: list.map(l => l.word) }
})
const overview = computed(() => {
  const loans = store.filteredLoanwords
  const langs = new Set<string>()
  const pairs = new Set<string>()
  loans.forEach(l => { langs.add(l.sourceLang); langs.add(l.targetLang); pairs.add(l.sourceFamily + '→' + l.targetFamily) })
  const fmt = (y: number) => y < 0 ? `公元前${-y}年` : `${Math.floor(y / 100) + 1}世纪`
  const years = loans.map(l => l.year)
  return {
    total: loans.length, langs: langs.size, pairs: pairs.size,
    span: loans.length ? `${fmt(Math.min(...years))} — ${fmt(Math.max(...years))}` : '—',
  }
})

const W = 940, H = 560
const X1 = 130, X2 = 810
const NODE_TOP = 46, NODE_BOTTOM = 396
const TL_Y = 500
let flagG: any = null
let dotGeom: Record<string, { x: number; y: number }> = {}

function toggleSelect(id: string) {
  store.selectedLoanwordId = store.selectedLoanwordId === id ? null : id
}

function draw() {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()
  svg.attr('viewBox', `0 0 ${W} ${H}`)
  const loans = store.filteredLoanwords

  // 箭头标记(按来源语系着色)
  const defs = svg.append('defs')
  Object.entries(FAMILY_COLORS).forEach(([fid, color]) => {
    defs.append('marker')
      .attr('id', 'lw-arrow-' + fid)
      .attr('viewBox', '0 0 10 10').attr('refX', 8).attr('refY', 5)
      .attr('markerWidth', 7).attr('markerHeight', 7).attr('orient', 'auto')
      .append('path').attr('d', 'M0,0L10,5L0,10z').attr('fill', color)
  })

  // 语言节点布局(按语系分组排序)
  const langFamily: Record<string, string> = {}
  loans.forEach(l => { langFamily[l.sourceLang] = l.sourceFamily; langFamily[l.targetLang] = l.targetFamily })
  const famOrder = LANGUAGE_FAMILIES.map(f => f.id)
  const byFamily = (a: string, b: string) => famOrder.indexOf(langFamily[a]) - famOrder.indexOf(langFamily[b]) || a.localeCompare(b, 'zh')
  const srcNames = [...new Set(loans.map(l => l.sourceLang))].sort(byFamily)
  const tgtNames = [...new Set(loans.map(l => l.targetLang))].sort(byFamily)
  const ySrc: any = d3.scalePoint().domain(srcNames).range([NODE_TOP, NODE_BOTTOM]).padding(0.4)
  const yTgt: any = d3.scalePoint().domain(tgtNames).range([NODE_TOP, NODE_BOTTOM]).padding(0.4)

  svg.append('text').attr('x', X1).attr('y', 24).attr('text-anchor', 'middle').attr('font-size', 11).attr('font-weight', 'bold').attr('fill', '#94a3b8').text('来源语言')
  svg.append('text').attr('x', X2).attr('y', 24).attr('text-anchor', 'middle').attr('font-size', 11).attr('font-weight', 'bold').attr('fill', '#94a3b8').text('落地语言')

  // 同一来源-目标的多条路径扇形展开
  const groups = new Map<string, LoanwordPath[]>()
  loans.forEach(l => {
    const k = l.sourceLang + '→' + l.targetLang
    groups.set(k, [...(groups.get(k) || []), l])
  })
  const offsetOf = new Map<string, number>()
  groups.forEach(list => list.forEach((l, i) => offsetOf.set(l.id, (i - (list.length - 1) / 2) * 26)))
  const geom = (l: LoanwordPath) => {
    const y1 = ySrc(l.sourceLang) as number, y2 = yTgt(l.targetLang) as number
    const cx = (X1 + X2) / 2, cy = (y1 + y2) / 2 + (offsetOf.get(l.id) || 0)
    const ex = X2 - 10
    return {
      d: `M${X1},${y1} Q${cx},${cy} ${ex},${y2}`,
      mx: 0.25 * X1 + 0.5 * cx + 0.25 * ex,
      my: 0.25 * y1 + 0.5 * cy + 0.25 * y2,
    }
  }

  // 传播路径(透明宽线负责拾取, 彩色细线负责显示)
  const linkG = svg.append('g')
  linkG.selectAll('path.lw-hit').data(loans).join('path')
    .attr('class', 'lw-hit')
    .attr('d', l => geom(l).d)
    .attr('fill', 'none').attr('stroke', 'transparent').attr('stroke-width', 16)
    .style('cursor', 'pointer')
    .on('mouseenter', (_e, l) => { hoverId.value = l.id })
    .on('mouseleave', () => { hoverId.value = null })
    .on('click', (e, l) => { e.stopPropagation(); toggleSelect(l.id) })
    .append('title').text(l => `${l.word}: ${l.sourceLang} → ${l.targetLang} · ${l.period}`)
  linkG.selectAll('path.lw-path').data(loans).join('path')
    .attr('class', 'lw-path')
    .attr('d', l => geom(l).d)
    .attr('fill', 'none')
    .attr('stroke', l => FAMILY_COLORS[l.sourceFamily])
    .attr('stroke-width', 1.8)
    .attr('opacity', 0.75)
    .attr('marker-end', l => `url(#lw-arrow-${l.sourceFamily})`)
    .style('pointer-events', 'none')
  linkG.selectAll('text.lw-label').data(loans).join('text')
    .attr('class', 'lw-label')
    .attr('x', l => geom(l).mx)
    .attr('y', l => geom(l).my - 4)
    .attr('text-anchor', 'middle')
    .attr('font-size', 9.5)
    .attr('fill', '#e2e8f0')
    .attr('stroke', '#0f172a').attr('stroke-width', 3).attr('stroke-linejoin', 'round')
    .style('paint-order', 'stroke')
    .style('pointer-events', 'none')
    .text(l => l.word)

  // 左右语言节点列
  const drawLangNodes = (names: string[], x: number, yScale: any, side: 'source' | 'target') => {
    const g = svg.append('g').selectAll('g.lang-node')
      .data(names.map(name => ({ name, side }))).join('g')
      .attr('class', 'lang-node')
      .attr('transform', d => `translate(${x},${yScale(d.name)})`)
      .style('cursor', 'pointer')
      .on('mouseenter', (_e, d) => { hoverLang.value = d })
      .on('mouseleave', () => { hoverLang.value = null })
    g.append('circle').attr('class', 'ring').attr('r', 13)
      .attr('fill', 'none').attr('stroke', '#fbbf24').attr('stroke-width', 2).attr('opacity', 0)
    g.append('circle').attr('r', 8)
      .attr('fill', d => FAMILY_COLORS[langFamily[d.name]] || '#64748b')
      .attr('stroke', '#1e293b').attr('stroke-width', 2)
    g.append('text')
      .attr('x', side === 'source' ? -15 : 15).attr('dy', 2)
      .attr('text-anchor', side === 'source' ? 'end' : 'start')
      .attr('font-size', 11).attr('fill', '#cbd5e1')
      .text(d => d.name)
    g.append('text')
      .attr('x', side === 'source' ? -15 : 15).attr('dy', 14)
      .attr('text-anchor', side === 'source' ? 'end' : 'start')
      .attr('font-size', 8).attr('fill', '#64748b')
      .text(d => familyName(langFamily[d.name]))
  }
  drawLangNodes(srcNames, X1, ySrc, 'source')
  drawLangNodes(tgtNames, X2, yTgt, 'target')

  // 落地时期时间轴
  const xT = d3.scaleLinear().domain([-1100, 2050]).range([60, W - 40])
  const ticks = [-1000, -500, 0, 500, 1000, 1500, 2000]
  const tlG = svg.append('g')
  tlG.selectAll('line.grid').data(ticks).join('line')
    .attr('x1', t => xT(t)).attr('x2', t => xT(t))
    .attr('y1', TL_Y - 92).attr('y2', TL_Y)
    .attr('stroke', '#1e293b')
  tlG.append('line').attr('x1', 40).attr('x2', W - 20).attr('y1', TL_Y).attr('y2', TL_Y).attr('stroke', '#475569')
  tlG.selectAll('line.tick').data(ticks).join('line')
    .attr('x1', t => xT(t)).attr('x2', t => xT(t))
    .attr('y1', TL_Y).attr('y2', TL_Y + 5).attr('stroke', '#475569')
  tlG.selectAll('text.tick-label').data(ticks).join('text')
    .attr('x', t => xT(t)).attr('y', TL_Y + 17)
    .attr('text-anchor', 'middle').attr('font-size', 8.5).attr('fill', '#64748b')
    .text(t => t < 0 ? `公元前${-t}` : t === 0 ? '公元元年' : `公元${t}`)
  tlG.append('text').attr('x', W / 2).attr('y', TL_Y + 36)
    .attr('text-anchor', 'middle').attr('font-size', 9).attr('fill', '#64748b')
    .text('落地时期（公元纪年）')

  // 时间轴圆点(横向过近时纵向分车道堆叠)
  dotGeom = {}
  const lanes: number[] = []
  ;[...loans].sort((a, b) => a.year - b.year).forEach(l => {
    const x = xT(l.year)
    let lane = lanes.findIndex(lx => x - lx > 20)
    if (lane === -1) { lanes.push(-Infinity); lane = lanes.length - 1 }
    lanes[lane] = x
    dotGeom[l.id] = { x, y: TL_Y - 16 - lane * 14 }
  })
  tlG.selectAll('circle.lw-dot').data(loans).join('circle')
    .attr('class', 'lw-dot')
    .attr('cx', l => dotGeom[l.id].x)
    .attr('cy', l => dotGeom[l.id].y)
    .attr('r', 4.5)
    .attr('fill', l => FAMILY_COLORS[l.sourceFamily])
    .attr('stroke', '#1e293b').attr('stroke-width', 1.5)
    .style('cursor', 'pointer')
    .on('mouseenter', (_e, l) => { hoverId.value = l.id })
    .on('mouseleave', () => { hoverId.value = null })
    .on('click', (e, l) => { e.stopPropagation(); toggleSelect(l.id) })
    .append('title').text(l => `${l.word} · ${l.targetLang} · ${l.period}`)

  // 落地时期旗标(联动标出)
  flagG = svg.append('g').attr('opacity', 0).style('pointer-events', 'none')
  flagG.append('line').attr('class', 'flag-line').attr('stroke', '#fbbf24').attr('stroke-width', 1.2).attr('stroke-dasharray', '3 2')
  flagG.append('rect').attr('class', 'flag-bg').attr('fill', '#fbbf24').attr('rx', 3)
  flagG.append('text').attr('class', 'flag-text').attr('text-anchor', 'middle').attr('font-size', 9.5).attr('font-weight', 'bold').attr('fill', '#0f172a')

  svg.on('click', () => { store.selectedLoanwordId = null })
  applyHighlight()
}

// 联动高亮: 路径/词标签/时间轴圆点按 activeIds 明暗, 来源与落地语言节点加环, 时间轴上打出落地时期旗标
function applyHighlight() {
  if (!svgRef.value || !flagG) return
  const svg = d3.select(svgRef.value)
  const ids = activeIds.value
  const has = ids.size > 0
  const dim = (id: string) => has && !ids.has(id)

  svg.selectAll<SVGPathElement, LoanwordPath>('path.lw-path')
    .attr('opacity', d => dim(d.id) ? 0.07 : 0.85)
    .attr('stroke-width', d => ids.has(d.id) ? 3.2 : 1.8)
  svg.selectAll<SVGTextElement, LoanwordPath>('text.lw-label')
    .attr('opacity', d => dim(d.id) ? 0.08 : 1)
    .attr('font-weight', d => ids.has(d.id) ? 'bold' : 'normal')
  svg.selectAll<SVGCircleElement, LoanwordPath>('circle.lw-dot')
    .attr('r', d => ids.has(d.id) ? 6.5 : 4.5)
    .attr('opacity', d => dim(d.id) ? 0.15 : 1)
    .attr('stroke', d => ids.has(d.id) ? '#fbbf24' : '#1e293b')

  const involved = new Set<string>()
  if (has) store.filteredLoanwords.forEach(l => {
    if (ids.has(l.id)) { involved.add('source:' + l.sourceLang); involved.add('target:' + l.targetLang) }
  })
  svg.selectAll<SVGGElement, { name: string; side: string }>('g.lang-node')
    .attr('opacity', d => !has || involved.has(d.side + ':' + d.name) ? 1 : 0.25)
  svg.selectAll<SVGCircleElement, { name: string; side: string }>('g.lang-node circle.ring')
    .attr('opacity', d => involved.has(d.side + ':' + d.name) ? 1 : 0)

  const lw = activeLoan.value
  if (lw && dotGeom[lw.id]) {
    const { x, y } = dotGeom[lw.id]
    flagG.attr('opacity', 1)
    flagG.select('line.flag-line')
      .attr('x1', x).attr('x2', x).attr('y1', y + 8).attr('y2', TL_Y)
    const txt = flagG.select('text.flag-text').text(lw.period).attr('x', x).attr('y', y - 16)
    const bb = (txt.node() as SVGTextElement).getBBox()
    flagG.select('rect.flag-bg')
      .attr('x', bb.x - 5).attr('y', bb.y - 2)
      .attr('width', bb.width + 10).attr('height', bb.height + 4)
  } else {
    flagG.attr('opacity', 0)
  }
}

watch(activeIds, () => applyHighlight())
watch(() => store.loanwordFamily, () => {
  if (store.selectedLoanwordId && !store.filteredLoanwords.some(l => l.id === store.selectedLoanwordId)) {
    store.selectedLoanwordId = null
  }
  hoverId.value = null
  hoverLang.value = null
  draw()
})
onMounted(draw)
</script>
