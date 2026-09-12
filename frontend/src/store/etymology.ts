import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { COGNATE_SETS, LANGUAGE_FAMILIES, LOANWORD_PATHS, buildGraph } from '../mock/data'
export { LANGUAGE_FAMILIES, COGNATE_SETS, LOANWORD_PATHS }

export const useEtymologyStore = defineStore('etymology', () => {
  const graph = ref(buildGraph())
  const selectedNode = ref<any>(null)
  const searchQuery = ref('')
  const selectedFamily = ref('all')

  const filteredCognates = computed(() =>
    COGNATE_SETS.filter(cs => {
      const q = searchQuery.value.toLowerCase()
      const matchSearch = !q || cs.root.toLowerCase().includes(q) || cs.meaning.includes(q) || Object.values(cs.languages).some((w: string) => w.toLowerCase().includes(q))
      const matchFamily = selectedFamily.value === 'all' || cs.family === selectedFamily.value
      return matchSearch && matchFamily
    })
  )

  // 借词传播专题
  const selectedLoanwordId = ref<string | null>(null)
  const loanwordFamily = ref('all')
  const filteredLoanwords = computed(() =>
    LOANWORD_PATHS.filter(l => loanwordFamily.value === 'all' || l.sourceFamily === loanwordFamily.value)
  )

  return { graph, selectedNode, searchQuery, selectedFamily, filteredCognates, selectedLoanwordId, loanwordFamily, filteredLoanwords }
})
