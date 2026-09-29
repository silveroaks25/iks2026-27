import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { GRADE_LABELS, LEVELS, type GradeId, type Task, type Video } from '../content/iks'
import { AWARDS } from '../content/awards'
import { useProgress } from '../lib/ProgressContext'
import type { TaskValue } from '../lib/storage'

function youtubeId(url?: string) {
  if (!url) return null
  const m = url.match(/[?&]v=([^&]+)/)
  return m?.[1] ?? null
}

function watchHref(video: Video) {
  if (video.url) return video.url
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(video.title)}`
}

export function LevelPage() {
  const { levelId } = useParams()
  const level = LEVELS.find((l) => l.id === levelId)
  const {
    state,
    setGrade,
    markVideo,
    isLevelUnlocked,
    isLevelComplete,
    canCompleteLevel,
    completeLevel,
    beep,
  } = useProgress()
  const [player, setPlayer] = useState<Video | null>(null)
  const grouped = useMemo(() => {
    const videos = level?.videos ?? []
    return {
      main: videos.filter((v) => !v.optionalGroup),
      optional: videos.filter((v) => v.optionalGroup),
    }
  }, [level])

  if (!level) return <Navigate to="/explore" replace />
  if (!isLevelUnlocked(level.id)) {
    return (
      <main id="main" className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-5xl" aria-hidden>
          🔒
        </p>
        <h1 className="font-display mt-4 text-4xl">This level is locked</h1>
        <p className="mt-3 text-[var(--mute)]">Complete the previous gate on the expedition map first.</p>
        <Link to="/explore" className="btn btn-primary mt-8">
          Back to map
        </Link>
      </main>
    )
  }

  const award = AWARDS.find((a) => a.id === level.awardId)
  const next = LEVELS.find((l) => l.number === level.number + 1)

  const tasks = [...level.tasks[state.grade], ...(level.extra ?? [])]
  const ready = canCompleteLevel(level.id)
  const done = isLevelComplete(level.id)

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/explore" className="text-sm text-[var(--mute)] hover:text-[var(--ink)]">
        ← Expedition map
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.35em] text-[var(--ember2)]">
        {level.number === 6 ? 'Final section' : `Level ${level.number}`}
      </p>
      <h1 className="font-display mt-2 max-w-4xl text-5xl leading-tight sm:text-6xl">{level.name}</h1>
      <p className="mt-2 text-xl text-[var(--mute)]">{level.subtitle}</p>
      <div className="mt-6 space-y-4 text-lg leading-relaxed">
        {level.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {grouped.main.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-3xl">Videos to watch</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {grouped.main.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                watched={Boolean(state.videos[v.id])}
                onOpen={() => {
                  beep()
                  setPlayer(v)
                  markVideo(v.id)
                }}
              />
            ))}
          </div>
        </section>
      )}

      {grouped.optional.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-3xl">{grouped.optional[0].optionalGroup}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {grouped.optional.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                watched={Boolean(state.videos[v.id])}
                onOpen={() => {
                  beep()
                  setPlayer(v)
                  markVideo(v.id)
                }}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">Reflection prompts</h2>
            <p className="text-sm text-[var(--mute)]">Choose your grade band to explore its prompts.</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Grade bands">
          {GRADE_LABELS.map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={state.grade === g.id}
              className={`rounded-full px-4 py-2 text-sm ${
                state.grade === g.id
                  ? 'bg-[var(--ember)] text-white'
                  : 'border border-[var(--line)] text-[var(--mute)]'
              }`}
              onClick={() => setGrade(g.id as GradeId)}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {tasks.map((task, i) => (
            <StaticTaskCard
              key={task.id}
              index={i + 1}
              task={task}
            />
          ))}
        </div>
      </section>

      <section className="panel mt-12 rounded-3xl p-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--ember2)]">
          {award?.name}
        </p>
        <h3 className="font-display mt-2 text-3xl">
          {done ? 'Mission complete' : 'Complete this level'}
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--mute)]">
          {done
            ? 'This gate is open behind you. You can still revisit the videos and answers.'
            : grouped.main.length
              ? 'Mark every required video as watched to unlock this gate.'
              : 'Review the prompts, then open the final award when you are ready.'}
        </p>
        {!done && (
          <button
            className="btn btn-primary mt-6"
            disabled={!ready}
            onClick={() => completeLevel(level.id)}
          >
            {ready ? 'Seal this chapter' : 'Mission still in progress'}
          </button>
        )}
        {done && (
          <Link
            to={next ? `/explore/${next.id}` : '/awards'}
            className="btn btn-primary mt-6"
          >
            {next ? 'Next gate' : 'Open awards gallery'}
          </Link>
        )}
      </section>

      {player && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4">
          <div className="panel w-full max-w-3xl overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between gap-3 p-4">
              <h3 className="font-display text-2xl">{player.title}</h3>
              <button className="btn btn-ghost" onClick={() => setPlayer(null)}>
                Close
              </button>
            </div>
            <VideoFrame video={player} />
            <p className="p-4 text-sm text-[var(--mute)]">
              If the player cannot load, use Watch video to open YouTube in a new tab.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

function VideoCard({
  video,
  watched,
  onOpen,
}: {
  video: Video
  watched: boolean
  onOpen: () => void
}) {
  return (
    <article className="panel overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={onOpen}
        className="video-ambient relative flex aspect-video w-full items-center justify-center"
        aria-label={`Play ${video.title}`}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_55%)]" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[var(--ember)] text-white">
          ▶
        </span>
        {watched && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] uppercase tracking-widest text-white">
            Watched
          </span>
        )}
      </button>
      <div className="p-4">
        <h3 className="font-medium leading-snug">{video.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--mute)]">
          {video.duration && <span>{video.duration}</span>}
          {video.note && <span>{video.note}</span>}
          <a
            className="text-[var(--ember2)] underline-offset-2 hover:underline"
            href={watchHref(video)}
            target="_blank"
            rel="noreferrer"
            onClick={onOpen}
          >
            Watch video
          </a>
        </div>
      </div>
    </article>
  )
}

function VideoFrame({ video }: { video: Video }) {
  const id = youtubeId(video.url)
  if (!id) {
    return (
      <div className="video-ambient aspect-video p-8 text-center">
        <p className="text-[var(--mute)]">This title is opened on YouTube.</p>
        <a className="btn btn-primary mt-4" href={watchHref(video)} target="_blank" rel="noreferrer">
          Watch video
        </a>
      </div>
    )
  }
  return (
    <div className="aspect-video bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={video.title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

function TaskCard({
  index,
  task,
  value,
  onChange,
}: {
  index: number
  task: Task
  value?: TaskValue
  onChange: (v: TaskValue) => void
}) {
  const [open, setOpen] = useState(true)
  return (
    <article className="panel rounded-3xl p-5">
      <button
        className="flex w-full items-start justify-between gap-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--ember2)]">Challenge {index}</p>
          <h3 className="mt-1 text-lg font-medium">{task.prompt}</h3>
        </div>
        <span className="text-[var(--mute)]">{open ? '–' : '+'}</span>
      </button>
      {open && (
        <div className="mt-4 space-y-3">
          {task.kind === 'text' && (
            <textarea
              className="min-h-28 w-full rounded-2xl border border-[var(--line)] bg-transparent p-3"
              value={value?.text ?? ''}
              onChange={(e) => onChange({ text: e.target.value })}
              aria-label={task.prompt}
            />
          )}
          {task.kind === 'blanks' &&
            task.blanks?.map((label, i) => (
              <label key={label} className="block text-sm">
                {label}{' '}
                <input
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                  value={value?.blanks?.[i] ?? ''}
                  onChange={(e) => {
                    const blanks = [...(value?.blanks ?? task.blanks!.map(() => ''))]
                    blanks[i] = e.target.value
                    onChange({ blanks })
                  }}
                />
              </label>
            ))}
          {task.kind === 'checks' && (
            <>
              <ul className="space-y-2">
                {task.options?.map((opt) => (
                  <li key={opt}>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Boolean(value?.checks?.includes(opt))}
                        onChange={(e) => {
                          const set = new Set(value?.checks ?? [])
                          if (e.target.checked) set.add(opt)
                          else set.delete(opt)
                          onChange({ checks: [...set] })
                        }}
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
              {task.otherLabel && (
                <label className="block text-sm">
                  {task.otherLabel}{' '}
                  <input
                    className="mt-1 w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                    value={value?.other ?? ''}
                    onChange={(e) => onChange({ other: e.target.value })}
                  />
                </label>
              )}
              {task.followUps?.map((f, i) => (
                <label key={f} className="block">
                  <span className="text-sm">{f}</span>
                  <textarea
                    className="mt-1 min-h-24 w-full rounded-2xl border border-[var(--line)] bg-transparent p-3"
                    value={value?.followUps?.[i] ?? ''}
                    onChange={(e) => {
                      const followUps = [...(value?.followUps ?? [])]
                      followUps[i] = e.target.value
                      onChange({ followUps })
                    }}
                  />
                </label>
              ))}
            </>
          )}
          {task.kind === 'triple' && (
            <>
              {Array.from({ length: task.lines ?? 3 }).map((_, i) => (
                <input
                  key={i}
                  className="w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
                  aria-label={`Feature ${i + 1}`}
                  value={value?.lines?.[i] ?? ''}
                  onChange={(e) => {
                    const lines = [...(value?.lines ?? ['', '', ''])]
                    lines[i] = e.target.value
                    onChange({ lines })
                  }}
                />
              ))}
              {task.followUps?.map((f, i) => (
                <label key={f} className="block">
                  <span className="text-sm">{f}</span>
                  <textarea
                    className="mt-1 min-h-24 w-full rounded-2xl border border-[var(--line)] bg-transparent p-3"
                    value={value?.followUps?.[i] ?? ''}
                    onChange={(e) => {
                      const followUps = [...(value?.followUps ?? [])]
                      followUps[i] = e.target.value
                      onChange({ followUps })
                    }}
                  />
                </label>
              ))}
            </>
          )}
          {task.kind === 'final' && (
            <>
              {task.followUps?.[0] && <p>{task.followUps[0]}</p>}
              {task.followUps?.[1] && (
                <label className="block">
                  <span>{task.followUps[1]}</span>
                  <textarea
                    className="mt-2 min-h-28 w-full rounded-2xl border border-[var(--line)] bg-transparent p-3"
                    value={value?.followUps?.[0] ?? ''}
                    onChange={(e) => onChange({ followUps: [e.target.value] })}
                  />
                </label>
              )}
            </>
          )}
        </div>
      )}
    </article>
  )
}

function StaticTaskCard({ index, task }: { index: number; task: Task }) {
  return (
    <article className="panel rounded-3xl p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--ember2)]">Challenge {index}</p>
      <h3 className="mt-2 text-lg font-medium leading-relaxed">{task.prompt}</h3>
    </article>
  )
}
