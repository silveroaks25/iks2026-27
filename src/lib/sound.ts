let ctx: AudioContext | null = null

function getCtx() {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export function playTone(
  volume: number,
  enabled: boolean,
  kind: 'tap' | 'unlock' | 'complete' = 'tap',
) {
  if (!enabled || volume <= 0) return
  try {
    const c = getCtx()
    const now = c.currentTime
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    const freqs =
      kind === 'unlock' ? [392, 523, 659] : kind === 'complete' ? [330, 494] : [220]
    osc.type = kind === 'unlock' ? 'triangle' : 'sine'
    osc.frequency.value = freqs[0]
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.08 * volume, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === 'unlock' ? 0.7 : 0.18))
    if (freqs[1]) osc.frequency.setValueAtTime(freqs[1], now + 0.12)
    if (freqs[2]) osc.frequency.setValueAtTime(freqs[2], now + 0.28)
    osc.start(now)
    osc.stop(now + 0.8)
  } catch {
    /* autoplay / unsupported */
  }
}
