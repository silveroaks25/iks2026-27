import { Link } from 'react-router-dom'
import { HOME, LEVELS } from '../content/iks'
import { AWARDS } from '../content/awards'
import { AwardArt } from '../components/AwardArt'
import { useProgress } from '../lib/ProgressContext'

export function HomePage() {
  const { state } = useProgress()
  const earned = Object.keys(state.awards).length

  return (
    <main id="main">
      <section className="relative overflow-hidden">
        <div className="geo-grid absolute inset-0 opacity-70" />
        <img
          src="./assets/oak-leaf.jpg"
          alt=""
          className="pointer-events-none absolute -right-16 top-10 w-[28%] max-w-sm opacity-10 mix-blend-luminosity"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pb-20 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="min-w-0">
            <p className="rise text-xs uppercase tracking-[0.42em] text-[var(--ember2)]">{HOME.kicker}</p>
            <h1 className="font-display rise mt-4 text-5xl leading-[0.95] sm:text-7xl" style={{ animationDelay: '80ms' }}>
              {HOME.title}
            </h1>
            <p className="rise mt-6 text-xl text-[var(--mute)] sm:text-2xl" style={{ animationDelay: '140ms' }}>
              {HOME.tagline}
            </p>
            <div className="rise mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-[var(--mute)] sm:text-lg" style={{ animationDelay: '200ms' }}>
              {HOME.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/explore" className="btn btn-primary">
                Begin the journey
              </Link>
              <Link to="/awards" className="btn btn-ghost">
                View awards · {earned}/6
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] shadow-glow">
              <img
                src="./assets/knowledge-book.jpg"
                alt="An open book lit from above"
                className="aspect-[4/3] h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-[var(--mute)]">
              Six gates · six awards · one expedition
            </p>
          </div>
        </div>
        <div className="pb-10 text-center text-xs uppercase tracking-[0.4em] text-[var(--mute)]">
          Scroll to continue
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8">
        <h2 className="font-display text-4xl">Awards you can earn</h2>
        <p className="mt-2 max-w-2xl text-[var(--mute)]">
          Complete each level to unlock its emblem. The Accomplisher award waits at the end of the sixth
          section.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((a) => (
            <article key={a.id} className="panel overflow-hidden rounded-3xl">
              <AwardArt id={a.id} unlocked={Boolean(state.awards[a.id])} className="h-56" />
              <div className="p-5">
                <h3 className="font-display mt-1 text-3xl">{a.name}</h3>
                <p className="mt-2 text-sm text-[var(--mute)]">{a.blurb}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-[var(--mute)]">
                  {state.awards[a.id] ? 'Unlocked' : 'Locked'}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28">
        <h2 className="font-display text-4xl">The six gates</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((l) => (
            <Link
              key={l.id}
              to={`/explore/${l.id}`}
              className="panel rounded-2xl p-4 transition hover:-translate-y-1"
            >
              <p className="text-xs text-[var(--ember2)]">0{l.number}</p>
              <h3 className="font-display text-2xl leading-tight">{l.name}</h3>
              <p className="mt-2 text-sm text-[var(--mute)]">{l.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
