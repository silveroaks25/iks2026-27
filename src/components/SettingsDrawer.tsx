import { Link } from 'react-router-dom'
import { AwardArt } from './AwardArt'
import { AWARDS } from '../content/awards'
import { useProgress } from '../lib/ProgressContext'

export function SettingsDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { state, setTheme, setVolume, setSound, resetProgress } = useProgress()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Settings">
      <button className="absolute inset-0 bg-black/50" aria-label="Close settings" onClick={onClose} />
      <aside className="panel absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl">Settings</h2>
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>

        <section className="mt-8">
          <h3 className="text-xs uppercase tracking-[0.28em] text-[var(--mute)]">Appearance</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(['light', 'dark'] as const).map((t) => (
              <button
                key={t}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  state.theme === t ? 'border-[var(--ember2)] shadow-glow' : 'border-[var(--line)]'
                }`}
                onClick={() => setTheme(t)}
              >
                <span className="block text-sm font-medium capitalize">{t} mode</span>
                <span className="text-xs text-[var(--mute)]">
                  {t === 'light' ? 'Blue daylight' : 'Deep blue night'}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-xs uppercase tracking-[0.28em] text-[var(--mute)]">Page volume</h3>
          <label className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={state.volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[var(--ember)]"
              aria-label="Volume"
            />
            <span className="w-10 text-right text-sm">{Math.round(state.volume * 100)}</span>
          </label>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={state.sound}
              onChange={(e) => setSound(e.target.checked)}
            />
            Subtle sound effects
          </label>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-[0.28em] text-[var(--mute)]">Awards</h3>
            <Link to="/awards" className="text-sm text-[var(--ember2)]" onClick={onClose}>
              Open gallery
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {AWARDS.map((a) => (
              <div key={a.id} className="overflow-hidden rounded-xl border border-[var(--line)]">
                <AwardArt id={a.id} unlocked={Boolean(state.awards[a.id])} className="h-28" />
              </div>
            ))}
          </div>
        </section>

        <button
          className="btn btn-ghost mt-auto"
          onClick={() => {
            if (confirm('Reset local journey progress? Awards and answers on this device will be cleared.')) {
              resetProgress()
            }
          }}
        >
          Reset local progress
        </button>
      </aside>
    </div>
  )
}
