import { useEffect } from 'react'
import { AwardArt } from './AwardArt'
import { AWARDS } from '../content/awards'
import { useProgress } from '../lib/ProgressContext'

export function AwardPopup() {
  const { pendingAward, dismissAward } = useProgress()
  const award = AWARDS.find((a) => a.id === pendingAward)

  useEffect(() => {
    if (!pendingAward) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissAward()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pendingAward, dismissAward])

  if (!award) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="award-title"
    >
      <div className="panel relative w-full max-w-md overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--ember)] blur-3xl" />
        </div>
        <div className="relative p-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--ember2)]">Award Unlocked</p>
          <div className="mx-auto mt-5 h-64 w-52 overflow-hidden rounded-2xl border border-[var(--line)] shadow-glow rise">
            <AwardArt id={award.id} unlocked />
          </div>
          <h2 id="award-title" className="font-display mt-5 text-4xl">
            {award.name}
          </h2>
          <p className="mt-3 text-[var(--mute)]">{award.blurb}</p>
          <button className="btn btn-primary mt-6 w-full" onClick={dismissAward}>
            Continue the journey
          </button>
        </div>
      </div>
    </div>
  )
}
