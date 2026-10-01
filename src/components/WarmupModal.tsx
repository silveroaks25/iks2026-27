import { useEffect, useRef, useState } from 'react'

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
  const playerHost = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let player: { destroy: () => void } | undefined
    let cancelled = false

    const createPlayer = () => {
      if (cancelled || !playerHost.current) return
      const api = (window as Window & {
        YT?: {
          Player: new (element: HTMLElement, options: {
            videoId: string
            playerVars: { rel: 0 }
            events: { onStateChange: (event: { data: number }) => void }
          }) => { destroy: () => void }
        }
      }).YT
      if (!api) return
      player = new api.Player(playerHost.current, {
        videoId: 't7c_YEe_8EM',
        playerVars: { rel: 0 },
        events: {
          onStateChange: (event) => {
            if (event.data === 0) setWatched(true)
          },
        },
      })
    }

    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    if ((window as Window & { YT?: unknown }).YT) {
      createPlayer()
    } else if (existing) {
      const previousReady = (window as Window & { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady
      ;(window as Window & { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady = () => {
        previousReady?.()
        createPlayer()
      }
    } else {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
      ;(window as Window & { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady = createPlayer
    }

    return () => {
      cancelled = true
      player?.destroy()
    }
  }, [])

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
          <span className={`shrink-0 rounded-full border px-3 py-1 text-xs uppercase tracking-widest ${watched ? 'border-[var(--emerald)] text-[var(--emerald)]' : 'border-[var(--line)] text-[var(--mute)]'}`}>
            {watched ? 'Watched' : 'Required'}
          </span>
        </div>

        <div className="video-ambient mt-6 overflow-hidden rounded-2xl border border-[var(--line)] p-2 sm:p-3">
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            <div ref={playerHost} className="h-full w-full" aria-label="If India Had a Citizenship Test, Would You Pass It?" />
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
              <p className="mt-4 text-sm font-semibold">My guess: _____ / 10</p>
              <p className="mt-4 text-sm text-[var(--mute)]">Now watch the video carefully. Keep a simple tally of the questions you answer correctly.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]/50 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--ember2)]">Reflect</p>
            <h3 className="font-display mt-2 text-2xl">My Score</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p className="text-sm font-semibold">Before watching: _____ / 10</p>
              <p className="text-sm font-semibold">After watching: _____ / 10</p>
            </div>
            <div className="mt-5 space-y-3">
              <p className="text-sm font-semibold">One answer that surprised me: <span className="font-normal text-[var(--mute)]">Think about it.</span></p>
              <p className="text-sm font-semibold">One thing I thought I knew, but got wrong: <span className="font-normal text-[var(--mute)]">Think about it.</span></p>
              <p className="text-sm font-semibold">One thing I want to find out more about: <span className="font-normal text-[var(--mute)]">Think about it.</span></p>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border-l-4 border-[var(--emerald)] bg-[var(--paper-2)]/55 p-5 sm:p-6">
          <p className="font-display text-xl leading-relaxed sm:text-2xl">If we can live in a country for years and still discover things we didn't know about it, what might we discover when we start looking closely at India's knowledge traditions?</p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--emerald)]">That's where our journey begins.</p>
        </section>

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--mute)]">Watch the complete video to unlock the gates.</p>
          <button type="button" className="btn btn-primary shrink-0" disabled={!watched} onClick={finishWarmup}>Enter the gates</button>
        </div>
      </div>
    </div>
  )
}
