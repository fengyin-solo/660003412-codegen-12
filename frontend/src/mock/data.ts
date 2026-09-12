import type { CognateSet, LanguageFamily, LoanwordPath } from '../types'

export const LANGUAGE_FAMILIES: LanguageFamily[] = [
  { id: 'ie', name: '印欧语系', color: '#3b82f6', languages: ['英语','法语','德语','西班牙语','俄语','拉丁语'], era: '公元前4000年' },
  { id: 'st', name: '汉藏语系', color: '#22c55e', languages: ['汉语','藏语','缅甸语'], era: '公元前4000年' },
  { id: 'aa', name: '亚非语系', color: '#f59e0b', languages: ['阿拉伯语','希伯来语'], era: '公元前6000年' },
  { id: 'ural', name: '乌拉尔语系', color: '#8b5cf6', languages: ['芬兰语','匈牙利语'], era: '公元前5000年' },
]

export const COGNATE_SETS: CognateSet[] = [
  { root: '*pṓds', meaning: '脚/足', languages: { '英语': 'foot', '法语': 'pied', '德语': 'Fuß', '西班牙语': 'pie', '俄语': 'ступня', '拉丁语': 'pēs' }, period: 'PIE', family: 'ie' },
  { root: '*mātér', meaning: '母亲', languages: { '英语': 'mother', '法语': 'mère', '德语': 'Mutter', '西班牙语': 'madre', '俄语': 'мать', '拉丁语': 'māter' }, period: 'PIE', family: 'ie' },
  { root: '*pṓtr', meaning: '父亲', languages: { '英语': 'father', '法语': 'père', '德语': 'Vater', '西班牙语': 'padre', '俄语': 'отец', '拉丁语': 'pater' }, period: 'PIE', family: 'ie' },
  { root: '*h₂épo', meaning: '水', languages: { '英语': 'aqua', '法语': 'eau', '德语': 'Au', '西班牙语': 'agua', '俄语': 'вода', '拉丁语': 'aqua' }, period: 'PIE', family: 'ie' },
  { root: '*dʰómos', meaning: '家', languages: { '英语': 'dome', '法语': 'maison', '德语': 'Dom', '西班牙语': 'domo', '俄语': 'дом', '拉丁语': 'domus' }, period: 'PIE', family: 'ie' },
  { root: '*wḗdr̥', meaning: '水/Water', languages: { '英语': 'water', '法语': 'eau', '德语': 'Wasser', '俄语': 'вода', '拉丁语': 'unda' }, period: 'PIE', family: 'ie' },
  { root: '*sol-', meaning: '太阳', languages: { '英语': 'sun', '法语': 'soleil', '德语': 'Sonne', '西班牙语': 'sol', '俄语': 'солнце', '拉丁语': 'sol' }, period: 'PIE', family: 'ie' },
  { root: '*luks-', meaning: '光/亮', languages: { '英语': 'light', '法语': 'lumière', '德语': 'Licht', '西班牙语': 'luz', '俄语': 'луч', '拉丁语': 'lux' }, period: 'PIE', family: 'ie' },
  { root: '*nokʷt-', meaning: '夜晚', languages: { '英语': 'night', '法语': 'nuit', '德语': 'Nacht', '西班牙语': 'noche', '俄语': 'ночь', '拉丁语': 'nox' }, period: 'PIE', family: 'ie' },
  { root: '*okʷ-', meaning: '眼睛', languages: { '英语': 'eye', '法语': 'oeil', '德语': 'Auge', '西班牙语': 'ojo', '俄语': 'oko', '拉丁语': 'oculus' }, period: 'PIE', family: 'ie' },
  { root: '*ed-', meaning: '吃', languages: { '英语': 'eat', '德语': 'essen', '俄语': 'есть', '拉丁语': 'edere' }, period: 'PIE', family: 'ie' },
  { root: '*ǵneh₃-', meaning: '知道', languages: { '英语': 'know', '德语': 'kennen', '西班牙语': 'conocer', '俄语': 'знать', '拉丁语': 'gnoscere' }, period: 'PIE', family: 'ie' },
  { root: '*h₃érō', meaning: '鹰', languages: { '英语': 'eagle', '法语': 'aigle', '德语': 'Adler', '西班牙语': 'águila', '拉丁语': 'aquila' }, period: 'PIE', family: 'ie' },
  { root: '*sker-', meaning: '切割', languages: { '英语': 'shear', '德语': 'scheren', '俄语': 'резать', '拉丁语': 'scindere' }, period: 'PIE', family: 'ie' },
  { root: '*gʷen-', meaning: '女人', languages: { '英语': 'queen', '德语': 'Frau', '俄语': 'жена' }, period: 'PIE', family: 'ie' },
]

export const LOANWORD_PATHS: LoanwordPath[] = [
  // 汉藏语系 → 印欧语系
  { id: 'silk', word: 'silk', sourceWord: '丝 (sī)', meaning: '丝绸', sourceLang: '汉语', sourceFamily: 'st', targetLang: '英语', targetFamily: 'ie', period: '公元前2世纪', year: -200, route: ['汉语 丝', '希腊语 sēres', '拉丁语 sēricum', '古英语 seolc'], note: '经丝绸之路贸易西传' },
  { id: 'tea', word: 'tea', sourceWord: '茶 (闽南语 tê)', meaning: '茶', sourceLang: '汉语', sourceFamily: 'st', targetLang: '英语', targetFamily: 'ie', period: '17世纪', year: 1650, route: ['闽南语 tê', '荷兰语 thee', '英语 tea'], note: '荷兰东印度公司海路贸易' },
  { id: 'chai', word: 'чай', sourceWord: '茶 (官话 chá)', meaning: '茶', sourceLang: '汉语', sourceFamily: 'st', targetLang: '俄语', targetFamily: 'ie', period: '17世纪', year: 1660, route: ['官话 chá', '蒙古语 tsai', '俄语 чай'], note: '恰克图陆路贸易' },
  { id: 'ginseng', word: 'ginseng', sourceWord: '人参 (rénshēn)', meaning: '人参', sourceLang: '汉语', sourceFamily: 'st', targetLang: '英语', targetFamily: 'ie', period: '17世纪', year: 1670, route: ['汉语 人参', '拉丁语 ginseng', '英语 ginseng'], note: '耶稣会士本草译介' },
  { id: 'typhoon', word: 'typhoon', sourceWord: '台风 (táifēng)', meaning: '台风', sourceLang: '汉语', sourceFamily: 'st', targetLang: '英语', targetFamily: 'ie', period: '16世纪', year: 1560, route: ['汉语 台风', '葡萄牙语 tufão', '英语 typhoon'], note: '与希腊语 typhōn 合流定型' },
  { id: 'tofu', word: 'tofu', sourceWord: '豆腐 (dòufu)', meaning: '豆腐', sourceLang: '汉语', sourceFamily: 'st', targetLang: '英语', targetFamily: 'ie', period: '19世纪', year: 1880, route: ['汉语 豆腐', '日语 tōfu', '英语 tofu'], note: '经日语转介进入英语' },
  { id: 'kungfu', word: 'kung fu', sourceWord: '功夫 (gōngfu)', meaning: '功夫', sourceLang: '汉语', sourceFamily: 'st', targetLang: '英语', targetFamily: 'ie', period: '20世纪', year: 1970, route: ['粤语 gūng fū', '英语 kung fu'], note: '功夫电影全球传播' },
  // 亚非语系 → 印欧语系
  { id: 'algebra', word: 'algebra', sourceWord: 'الجبر (al-jabr)', meaning: '代数', sourceLang: '阿拉伯语', sourceFamily: 'aa', targetLang: '拉丁语', targetFamily: 'ie', period: '12世纪', year: 1150, route: ['阿拉伯语 al-jabr', '拉丁语 algebra'], note: '花拉子米著作拉丁译介' },
  { id: 'zero', word: 'zero', sourceWord: 'صفر (ṣifr)', meaning: '零', sourceLang: '阿拉伯语', sourceFamily: 'aa', targetLang: '拉丁语', targetFamily: 'ie', period: '13世纪', year: 1230, route: ['阿拉伯语 ṣifr', '拉丁语 zephirum'], note: '斐波那契《算盘书》引入' },
  { id: 'sugar', word: 'sugar', sourceWord: 'سكر (sukkar)', meaning: '糖', sourceLang: '阿拉伯语', sourceFamily: 'aa', targetLang: '英语', targetFamily: 'ie', period: '13世纪', year: 1280, route: ['梵语 śarkarā', '波斯语 šakar', '阿拉伯语 sukkar', '英语 sugar'], note: '十字军东征后传入欧洲' },
  { id: 'coffee', word: 'coffee', sourceWord: 'قهوة (qahwa)', meaning: '咖啡', sourceLang: '阿拉伯语', sourceFamily: 'aa', targetLang: '英语', targetFamily: 'ie', period: '17世纪', year: 1640, route: ['阿拉伯语 qahwa', '土耳其语 kahve', '意大利语 caffè', '英语 coffee'], note: '奥斯曼贸易与咖啡馆文化' },
  // 印欧语系 → 汉藏语系
  { id: 'putao', word: '葡萄', sourceWord: 'budāwa (大宛语)', meaning: '葡萄', sourceLang: '波斯语', sourceFamily: 'ie', targetLang: '汉语', targetFamily: 'st', period: '公元前2世纪', year: -120, route: ['波斯语 budāwa', '大宛语', '汉语 葡萄'], note: '张骞凿空西域后传入' },
  { id: 'shizi', word: '狮子', sourceWord: 'šēr (波斯语)', meaning: '狮子', sourceLang: '波斯语', sourceFamily: 'ie', targetLang: '汉语', targetFamily: 'st', period: '2世纪', year: 100, route: ['波斯语 šēr', '吐火罗语', '汉语 狮子'], note: '西域朝贡与佛教艺术' },
  { id: 'puti', word: '菩提', sourceWord: 'bodhi (梵语)', meaning: '觉悟', sourceLang: '梵语', sourceFamily: 'ie', targetLang: '汉语', targetFamily: 'st', period: '4世纪', year: 350, route: ['梵语 bodhi', '汉语 菩提'], note: '佛经汉译借词' },
  { id: 'shafa', word: '沙发', sourceWord: 'sofa (英语)', meaning: '沙发', sourceLang: '英语', sourceFamily: 'ie', targetLang: '汉语', targetFamily: 'st', period: '19世纪', year: 1860, route: ['阿拉伯语 ṣuffa', '土耳其语 sofa', '英语 sofa', '汉语 沙发'], note: '开埠通商后音译' },
  { id: 'luoji', word: '逻辑', sourceWord: 'logic (英语)', meaning: '逻辑', sourceLang: '英语', sourceFamily: 'ie', targetLang: '汉语', targetFamily: 'st', period: '20世纪', year: 1920, route: ['希腊语 logikḗ', '英语 logic', '汉语 逻辑'], note: '严复音译名沿用至今' },
  // 乌拉尔语系 → 印欧语系
  { id: 'coach', word: 'coach', sourceWord: 'kocsi (匈牙利语)', meaning: '四轮马车/教练', sourceLang: '匈牙利语', sourceFamily: 'ural', targetLang: '英语', targetFamily: 'ie', period: '16世纪', year: 1550, route: ['匈牙利语 kocsi', '德语 Kutsche', '法语 coche', '英语 coach'], note: '源自匈牙利村庄 Kocs' },
  { id: 'sauna', word: 'sauna', sourceWord: 'sauna (芬兰语)', meaning: '桑拿', sourceLang: '芬兰语', sourceFamily: 'ural', targetLang: '英语', targetFamily: 'ie', period: '19世纪', year: 1880, route: ['芬兰语 sauna', '英语 sauna'], note: '北欧浴俗文化输出' },
  // 印欧语系 → 乌拉尔语系
  { id: 'kuningas', word: 'kuningas', sourceWord: '*kuningaz (原始日耳曼语)', meaning: '国王', sourceLang: '原始日耳曼语', sourceFamily: 'ie', targetLang: '芬兰语', targetFamily: 'ural', period: '约公元前1000年', year: -1000, route: ['原始日耳曼语 *kuningaz', '芬兰语 kuningas'], note: '史前波罗的海接触借词' },
  // 印欧语系 → 亚非语系
  { id: 'qamis', word: 'قميص (qamīṣ)', sourceWord: 'camisia (拉丁语)', meaning: '衬衫', sourceLang: '拉丁语', sourceFamily: 'ie', targetLang: '阿拉伯语', targetFamily: 'aa', period: '7世纪', year: 650, route: ['拉丁语 camisia', '阿拉伯语 qamīṣ'], note: '后又回借入西语 camisa' },
]

export function buildGraph() {
  const nodes: any[] = []
  const links: any[] = []
  COGNATE_SETS.forEach((cs, ci) => {
    const rootId = 'root_' + ci
    nodes.push({ id: rootId, word: cs.root, language: 'Proto-IE', meaning: cs.meaning, family: 'ie', era: '公元前5000年' })
    Object.entries(cs.languages).forEach(([lang, word]) => {
      if (!word || word === '-') return
      const nid = ci + '_' + lang
      nodes.push({ id: nid, word, language: lang, meaning: cs.meaning, family: 'ie', era: '现代' })
      links.push({ source: rootId, target: nid, type: 'derived' })
    })
  })
  return { nodes, links }
}
