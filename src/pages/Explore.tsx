import { Link } from 'react-router-dom'
import { LEVELS } from '../content/iks'
import { AWARDS } from '../content/awards'
import { useProgress } from '../lib/ProgressContext'

export function ExplorePage() {
  const { isLevelUnlocked, isLevelComplete, state } = useProgress()

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.4em] text-[var(--ember2)]">Expedition map</p>
      <h1 className="font-display mt-3 text-5xl sm:text-6xl">Explore IKS</h1>
      <p className="mt-3 max-w-2xl text-[var(--mute)]">
        A connected journey of six gates. Locked gates wait until the previous gate is complete.
      </p>

      <ol className="relative mt-12 space-y-8 before:absolute before:left-[1.15rem] before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-[var(--line)] sm:before:left-8">
        {LEVELS.map((level, i) => {
          const unlocked = isLevelUnlocked(level.id)
          const complete = isLevelComplete(level.id)
          const award = AWARDS.find((a) => a.id === level.awardId)
          return (
            <li key={level.id} className="relative">
              <article
                className={`panel ml-12 rounded-3xl p-5 sm:ml-20 sm:p-7 ${
                  unlocked ? '' : 'opacity-70'
                }`}
              >
                <div
                  className={`absolute left-[-2.55rem] top-7 flex h-10 w-10 items-center justify-center rounded-full border sm:left-[-4.55rem] ${
                    complete
                      ? 'border-[var(--ember)] bg-[var(--ember)] text-white'
                      : unlocked
                        ? 'border-[var(--ember)] bg-[var(--paper)]'
                        : 'border-[var(--line)] bg-[var(--paper)]'
                  }`}
                  aria-hidden
                >
                  {complete ? '✓' : unlocked ? level.number : '🔒'}
                </div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--ember2)]">
                      {level.number === 6 ? 'Final section' : `Level ${level.number}`} · {level.english}
                    </p>
                    <h2 className="font-display mt-1 max-w-[18rem] text-3xl leading-tight sm:text-4xl">{level.name}</h2>
                    <p className="mt-2 max-w-xl text-[var(--mute)]">{level.subtitle}</p>
                  </div>
                  {award && (
                    <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs uppercase tracking-widest">
                      {award.name}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {unlocked ? (
                    <Link to={`/explore/${level.id}`} className="btn btn-primary">
                      {complete ? 'Revisit' : i === 0 ? 'Enter' : 'Continue'}
                    </Link>
                  ) : (
                    <span className="btn btn-ghost cursor-not-allowed">Locked</span>
                  )}
                  <span className="text-sm text-[var(--mute)]">
                    {complete
                      ? 'Completed'
                      : unlocked
                        ? 'Unlocked'
                        : 'Complete the previous level to open this gate'}
                  </span>
                  {state.awards[level.awardId] && (
                    <span className="text-sm text-[var(--ember2)]">Award earned</span>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </main>
  )
}
