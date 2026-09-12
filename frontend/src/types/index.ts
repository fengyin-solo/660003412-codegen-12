export interface WordNode {
  id: string; word: string; language: string; meaning: string
  family: string; era?: string; x?: number; y?: number
}
export interface WordLink {
  source: string; target: string
  type: 'cognate' | 'derived' | 'borrowed' | 'reconstructed'
  description?: string
}
export interface CognateSet {
  root: string; meaning: string
  languages: Record<string, string>
  period: string; family: string
}
export interface LanguageFamily {
  id: string; name: string; color: string; languages: string[]; era: string
}
export interface LoanwordPath {
  id: string; word: string; sourceWord: string; meaning: string
  sourceLang: string; sourceFamily: string
  targetLang: string; targetFamily: string
  period: string; year: number
  route: string[]; note?: string
}
