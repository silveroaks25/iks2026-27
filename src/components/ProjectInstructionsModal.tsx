import { useState } from 'react'

const PROJECT_INSTRUCTIONS_KEY = 'iks-2026-project-instructions-complete'

export function hasCompletedProjectInstructions() {
  try {
    return window.localStorage.getItem(PROJECT_INSTRUCTIONS_KEY) === 'true'
  } catch {
    return false
  }
}

export function ProjectInstructionsModal({ onComplete }: { onComplete: () => void }) {
  const [ready, setReady] = useState(false)

  const continueToWarmup = () => {
    if (!ready) return
    try {
      window.localStorage.setItem(PROJECT_INSTRUCTIONS_KEY, 'true')
    } catch {
      // Continue for this visit if browser storage is unavailable.
    }
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-[rgba(7,26,51,.76)] px-4 py-6 backdrop-blur-md sm:py-10" role="dialog" aria-modal="true" aria-labelledby="project-instructions-title">
      <div className="panel mx-auto max-w-4xl rounded-[2rem] border-[var(--ember2)]/40 p-5 shadow-2xl sm:p-8">
        <div className="border-b border-[var(--line)] pb-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--ember2)]">Your project brief</p>
          <h2 id="project-instructions-title" className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Your IKS Project</h2>
          <p className="mt-3 max-w-3xl text-[var(--mute)]">This is more than a holiday worksheet. You are creating your own IKS project.</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <section>
            <ul className="space-y-3 text-base leading-relaxed">
              <li className="flex gap-3"><span className="text-[var(--ember2)]">✦</span><span>Complete your work as a spiral-bound A4 project or stick file.</span></li>
              <li className="flex gap-3"><span className="text-[var(--ember2)]">✦</span><span>Give your project a title and organise your work clearly.</span></li>
              <li className="flex gap-3"><span className="text-[var(--ember2)]">✦</span><span>Complete the first four levels and earn all four badges. These are compulsory.</span></li>
              <li className="flex gap-3"><span className="text-[var(--ember2)]">✦</span><span>The remaining levels can be completed during the Pongal vacation.</span></li>
              <li className="flex gap-3"><span className="text-[var(--ember2)]">✦</span><span>Once you finish your own grade-level tasks, you may take up the next grade level if you are curious to explore further.</span></li>
              <li className="flex gap-3"><span className="text-[var(--ember2)]">✦</span><span>Don't just collect information. Think, question, connect, create and reflect.</span></li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]/50 p-5">
            <h3 className="font-display text-2xl">Keep These Skills in Mind</h3>
            <div className="mt-4 space-y-4">
              <div><h4 className="font-display text-xl text-[var(--ember2)]">Communication</h4><p className="mt-1 text-sm leading-relaxed text-[var(--mute)]">Share your thoughts, questions, ideas and possible solutions clearly. Show how your understanding grows.</p></div>
              <div><h4 className="font-display text-xl text-[var(--emerald)]">Creativity</h4><p className="mt-1 text-sm leading-relaxed text-[var(--mute)]">Try new approaches. Imagine possibilities. Think about how an idea from the past could inspire a new invention or solution.</p></div>
              <div><h4 className="font-display text-xl text-[var(--ember)]">Critical Thinking</h4><p className="mt-1 text-sm leading-relaxed text-[var(--mute)]">Look for patterns, question what you learn and connect ideas across subjects and disciplines.</p></div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border-l-4 border-[var(--emerald)] bg-[var(--paper-2)]/55 p-5 sm:p-6">
          <h3 className="font-display text-2xl">At the End: Reflect on Your Learning</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--mute)]">After completing the videos and tasks, look back at your journey and reflect on how you developed these skills.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <p className="text-sm leading-relaxed"><strong>Communication:</strong> Three ideas I can now explain better. Explain each idea in 80–100 words.</p>
            <p className="text-sm leading-relaxed"><strong>Creativity:</strong> Two ideas from the past that inspired me to think differently or create something new. Explain each one in 100 words.</p>
            <p className="text-sm leading-relaxed"><strong>Critical Thinking:</strong> One connection I made across subjects or ideas is… Explain in 100–125 words.</p>
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-start gap-3 text-sm text-[var(--mute)]"><input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--emerald)]" checked={ready} onChange={(event) => setReady(event.target.checked)} /><span>I have read the project instructions.</span></label>
          <button type="button" className="btn btn-primary shrink-0" disabled={!ready} onClick={continueToWarmup}>Continue to warm-up</button>
        </div>
      </div>
    </div>
  )
}
