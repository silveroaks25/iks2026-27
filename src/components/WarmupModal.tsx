import { useState } from 'react'

const WARMUP_KEY = 'iks-2026-warmup-complete'

export function hasCompletedWarmup() {
  try {
    return window.localStorage.getItem(WARMUP_KEY) === 'true'
  } catch {
    return false
  }
}

export function WarmupModal({ onComplete }: { onComplete: () => void }) {
  const [watched, setWatched] = useState(false)

  const finishWarmup = () => {
    if (!watched) return
    try {
      window.localStorage.setItem(WARMUP_KEY, 'true')
    } catch {
      // Continue for this visit if browser storage is unavailable.
    }
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[rgba(7,26,51,.72)] px-4 py-6 backdrop-blur-md sm:py-10" role="dialog" aria-modal="true" aria-labelledby="warmup-title">
      <div className="panel mx-auto max-w-4xl rounded-[2rem] border-[var(--ember2)]/40 p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ember2)]">Before the expedition</p>
            <h2 id="warmup-title" className="font-display mt-2 text-3xl leading-tight sm:text-5xl">Warm-up Task</h2>
            <p className="mt-3 max-w-2xl text-[var(--mute)]">Start with a quick challenge about what it means to know a country. Watch carefully, keep a tally, and reflect before entering the six gates.</p>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--mute)]">Required</span>
        </div>

        <div className="video-ambient mt-6 overflow-hidden rounded-2xl border border-[var(--line)] p-2 sm:p-3">
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/t7c_YEe_8EM?rel=0"
              title="If India Had a Citizenship Test, Would You Pass It?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <section className="rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]/50 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--ember2)]">Video to watch</p>
            <h3 className="font-display mt-2 text-2xl leading-tight">If India Had a Citizenship Test, Would You Pass It?</h3>
            <p className="mt-2 text-sm text-[var(--mute)]">Bharat Bioscope with Palki Sharma · 9 min 43 sec</p>

            <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4">
              <h4 className="font-display text-xl">Your Challenge</h4>
              <p className="mt-2 text-sm text-[var(--mute)]">Before watching, make a quick guess:</p>
              <label className="mt-4 block text-sm font-semibold">My guess: _____ / 10<input className="field mt-2" inputMode="numeric" aria-label="My guess out of ten" /></label>
              <p className="mt-4 text-sm text-[var(--mute)]">Now watch the video carefully. Keep a simple tally of the questions you answer correctly.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]/50 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--ember2)]">Reflect</p>
            <h3 className="font-display mt-2 text-2xl">My Score</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold">Before watching<input className="field mt-2" inputMode="numeric" placeholder="_____ / 10" /></label>
              <label className="text-sm font-semibold">After watching<input className="field mt-2" inputMode="numeric" placeholder="_____ / 10" /></label>
            </div>
            <div className="mt-5 space-y-3">
              <label className="block text-sm font-semibold">One answer that surprised me:<textarea className="field mt-2 min-h-16" /></label>
              <label className="block text-sm font-semibold">One thing I thought I knew, but got wrong:<textarea className="field mt-2 min-h-16" /></label>
              <label className="block text-sm font-semibold">One thing I want to find out more about:<textarea className="field mt-2 min-h-16" /></label>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border-l-4 border-[var(--emerald)] bg-[var(--paper-2)]/55 p-5 sm:p-6">
          <p className="font-display text-xl leading-relaxed sm:text-2xl">If we can live in a country for years and still discover things we didn't know about it, what might we discover when we start looking closely at India's knowledge traditions?</p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--emerald)]">That's where our journey begins.</p>
        </section>

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-start gap-3 text-sm text-[var(--mute)]">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--emerald)]" checked={watched} onChange={(event) => setWatched(event.target.checked)} />
            <span>I watched the video and completed the warm-up task.</span>
          </label>
          <button type="button" className="btn btn-primary shrink-0" disabled={!watched} onClick={finishWarmup}>Enter the gates</button>
        </div>
      </div>
    </div>
  )
}
