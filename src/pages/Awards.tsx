import { AwardArt } from '../components/AwardArt'
import { AWARDS } from '../content/awards'
import { LEVELS } from '../content/iks'
import { useProgress } from '../lib/ProgressContext'
import { Link } from 'react-router-dom'

export function AwardsPage() {
  const { state, isLevelComplete } = useProgress()

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.4em] text-[var(--ember2)]">Collection</p>
      <h1 className="font-display mt-2 text-5xl">Badges</h1>
      <p className="mt-3 max-w-2xl text-[var(--mute)]">
        Unlocked emblems glow. Locked emblems stay in shadow until the matching level is sealed.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AWARDS.map((a) => {
          const earned = Boolean(state.awards[a.id])
          const level = LEVELS.find((l) => l.id === a.levelId)
          const date = state.awards[a.id]
          return (
            <article key={a.id} className="panel overflow-hidden rounded-3xl">
              <AwardArt id={a.id} unlocked={earned} className="h-64" />
              <div className="p-5">
                <h2 className="font-display text-3xl">{a.name}</h2>
                <p className="mt-2 text-sm text-[var(--mute)]">{a.blurb}</p>
                <p className="mt-3 text-sm">
                  {earned ? (
                    <span>
                      Unlocked
                      {date ? ` · ${new Date(date).toLocaleDateString()}` : ''}
                    </span>
                  ) : (
                    <span className="text-[var(--mute)]">
                      Locked
                      {level ? ` · complete ${level.title}` : ''}
                    </span>
                  )}
                </p>
                {level && (
                  <Link to={`/explore/${level.id}`} className="mt-4 inline-block text-sm text-[var(--ember2)]">
                    {isLevelComplete(level.id) ? 'Revisit level' : earned ? 'Open level' : 'Go to level'}
                  </Link>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
