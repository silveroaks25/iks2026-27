import type { GradeId } from '../content/iks'

export type TaskValue = {
  text?: string
  blanks?: string[]
  checks?: string[]
  other?: string
  followUps?: string[]
  lines?: string[]
}

export type ProgressState = {
  grade: GradeId
  videos: Record<string, boolean>
  answers: Record<string, TaskValue>
  completedLevels: string[]
  awards: Record<string, string>
  theme: 'dark' | 'light'
  volume: number
  sound: boolean
}

const KEY = 'iks-2026-progress-v1'

export const DEFAULT_PROGRESS: ProgressState = {
  grade: '5-6',
  videos: {},
  answers: {},
  completedLevels: [],
  awards: {},
  theme: 'light',
  volume: 0.35,
  sound: true,
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    const parsed = JSON.parse(raw) as Partial<ProgressState> & { grade?: string }
    const savedGrade = String(parsed.grade ?? '')
    const validGrades: ProgressState['grade'][] = ['5-6', '7-8', '9', '11']
    const grade = validGrades.includes(savedGrade as ProgressState['grade'])
      ? (savedGrade as ProgressState['grade'])
      : DEFAULT_PROGRESS.grade
    return { ...DEFAULT_PROGRESS, ...parsed, grade }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(state: ProgressState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* quota / private mode */
  }
}
