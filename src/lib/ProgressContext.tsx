import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LEVELS, type GradeId, type Task } from '../content/iks'
import { AWARDS } from '../content/awards'
import { loadProgress, saveProgress, type ProgressState, type TaskValue } from './storage'
import { playTone } from './sound'

type Ctx = {
  state: ProgressState
  setGrade: (g: GradeId) => void
  setTheme: (t: 'dark' | 'light') => void
  setVolume: (n: number) => void
  setSound: (on: boolean) => void
  markVideo: (id: string) => void
  setAnswer: (id: string, value: TaskValue) => void
  isLevelUnlocked: (levelId: string) => boolean
  isLevelComplete: (levelId: string) => boolean
  canCompleteLevel: (levelId: string) => boolean
  completeLevel: (levelId: string) => string | null
  pendingAward: string | null
  dismissAward: () => void
  resetProgress: () => void
  beep: (kind?: 'tap' | 'unlock' | 'complete') => void
}

const ProgressContext = createContext<Ctx | null>(null)

function tasksFor(levelId: string, grade: GradeId): Task[] {
  const level = LEVELS.find((l) => l.id === levelId)
  if (!level) return []
  return [...level.tasks[grade], ...(level.extra ?? [])]
}

function filled(task: Task, value?: TaskValue) {
  if (!value) return false
  if (task.kind === 'text' || task.kind === 'final') {
    if (task.kind === 'final') return Boolean(value.followUps?.[0]?.trim())
    return Boolean(value.text?.trim())
  }
  if (task.kind === 'blanks') {
    return (task.blanks ?? []).every((_, i) => value.blanks?.[i]?.trim())
  }
  if (task.kind === 'checks') {
    const has = (value.checks?.length ?? 0) > 0 || Boolean(value.other?.trim())
    return has && Boolean(value.followUps?.[0]?.trim())
  }
  if (task.kind === 'triple') {
    const lines = value.lines ?? []
    return lines.filter((l) => l.trim()).length >= 3 && Boolean(value.followUps?.[0]?.trim())
  }
  return false
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress())
  const [pendingAward, setPendingAward] = useState<string | null>(null)

  useEffect(() => {
    saveProgress(state)
    document.documentElement.setAttribute('data-theme', state.theme)
    document.documentElement.style.colorScheme = state.theme
  }, [state])

  const api = useMemo<Ctx>(() => {
    const beep = (kind: 'tap' | 'unlock' | 'complete' = 'tap') =>
      playTone(state.volume, state.sound, kind)

    const isLevelUnlocked = (levelId: string) => {
      const level = LEVELS.find((l) => l.id === levelId)
      if (!level) return false
      if (level.number === 1) return true
      const prev = LEVELS.find((l) => l.number === level.number - 1)
      return Boolean(prev && state.completedLevels.includes(prev.id))
    }

    const isLevelComplete = (levelId: string) => state.completedLevels.includes(levelId)

    const canCompleteLevel = (levelId: string) => {
      if (!isLevelUnlocked(levelId) || isLevelComplete(levelId)) return false
      const level = LEVELS.find((l) => l.id === levelId)
      if (!level) return false
      const requiredVideos = level.videos.filter((v) => !v.optionalGroup)
      const videosOk =
        requiredVideos.length === 0 || requiredVideos.every((v) => state.videos[v.id])
      return videosOk
    }

    return {
      state,
      pendingAward,
      beep,
      setGrade: (g) => setState((s) => ({ ...s, grade: g })),
      setTheme: (t) => {
        document.documentElement.classList.remove('theme-transition')
        void document.documentElement.offsetWidth
        document.documentElement.classList.add('theme-transition')
        window.setTimeout(() => document.documentElement.classList.remove('theme-transition'), 950)
        setState((s) => ({ ...s, theme: t }))
      },
      setVolume: (n) => setState((s) => ({ ...s, volume: n })),
      setSound: (on) => setState((s) => ({ ...s, sound: on })),
      markVideo: (id) => setState((s) => ({ ...s, videos: { ...s.videos, [id]: true } })),
      setAnswer: (id, value) =>
        setState((s) => ({ ...s, answers: { ...s.answers, [id]: { ...s.answers[id], ...value } } })),
      isLevelUnlocked,
      isLevelComplete,
      canCompleteLevel,
      completeLevel: (levelId) => {
        if (!canCompleteLevel(levelId) && !isLevelComplete(levelId)) return null
        const award = AWARDS.find((a) => a.levelId === levelId)
        let unlocked: string | null = null
        setState((s) => {
          const completedLevels = s.completedLevels.includes(levelId)
            ? s.completedLevels
            : [...s.completedLevels, levelId]
          const awards = { ...s.awards }
          if (award && !awards[award.id]) {
            awards[award.id] = new Date().toISOString()
            unlocked = award.id
          }
          return { ...s, completedLevels, awards }
        })
        if (unlocked) {
          setPendingAward(unlocked)
          playTone(state.volume, state.sound, 'unlock')
        } else {
          playTone(state.volume, state.sound, 'complete')
        }
        return unlocked
      },
      dismissAward: () => setPendingAward(null),
      resetProgress: () => {
        const keep = { theme: state.theme, volume: state.volume, sound: state.sound, grade: state.grade }
        setState({
          grade: keep.grade,
          videos: {},
          answers: {},
          completedLevels: [],
          awards: {},
          theme: keep.theme,
          volume: keep.volume,
          sound: keep.sound,
        })
      },
    }
  }, [state, pendingAward])

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('Progress missing')
  return ctx
}
