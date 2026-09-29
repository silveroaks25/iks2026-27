import type { CSSProperties } from 'react'

type ArtProps = { id: string; unlocked?: boolean; className?: string }

const AWARD_PALETTE: Record<string, { color: string; glow: string }> = {
  explorer: { color: '#d6aa45', glow: 'rgba(214, 170, 69, 0.55)' },
  bridge: { color: '#238364', glow: 'rgba(35, 131, 100, 0.55)' },
  scholar: { color: '#5c82bd', glow: 'rgba(92, 130, 189, 0.55)' },
  weaver: { color: '#d06b3c', glow: 'rgba(208, 107, 60, 0.55)' },
  keeper: { color: '#b85d83', glow: 'rgba(184, 93, 131, 0.55)' },
  completer: { color: '#9670c7', glow: 'rgba(150, 112, 199, 0.55)' },
}

export function AwardArt({ id, unlocked = true, className = '' }: ArtProps) {
  const dim = unlocked ? '' : 'grayscale contrast-75 opacity-60'
  const palette = AWARD_PALETTE[id] ?? AWARD_PALETTE.explorer
  return (
    <div
      className={`relative overflow-hidden ${dim} ${unlocked ? 'award-art-unlocked' : ''} ${className}`}
      style={{ '--award-color': palette.color, '--award-glow': palette.glow } as CSSProperties}
    >
      {id === 'explorer' && <ExplorerArt />}
      {id === 'bridge' && <BridgeArt />}
      {id === 'scholar' && <ScholarArt />}
      {id === 'weaver' && <WeaverArt />}
      {id === 'keeper' && <KeeperArt />}
      {id === 'completer' && <CompleterArt />}
    </div>
  )
}

function ExplorerArt() {
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="exg" cx="50%" cy="40%">
          <stop offset="0%" stopColor="var(--award-color)" />
          <stop offset="55%" stopColor="#7a0d1c" />
          <stop offset="100%" stopColor="#0b0b0d" />
        </radialGradient>
      </defs>
      <rect width="400" height="480" fill="url(#exg)" />
      <g fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2">
        <circle cx="200" cy="210" r="70" />
        <circle cx="200" cy="210" r="110" />
        <path d="M200 40 L200 380 M40 210 H360" />
        <path d="M90 90 L310 330 M310 90 L90 330" />
      </g>
      <circle cx="200" cy="210" r="10" fill="#fff" />
      <circle cx="278" cy="148" r="6" fill="#ffd7a8" />
      <circle cx="132" cy="268" r="5" fill="#ffd7a8" />
      <path d="M200 210 L278 148" stroke="#ffd7a8" strokeWidth="1.5" />
    </svg>
  )
}

function BridgeArt() {
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full" aria-hidden>
      <rect width="400" height="480" fill="#12080c" />
      <path d="M0 320 Q200 80 400 320" fill="none" stroke="var(--award-color)" strokeWidth="18" />
      <path d="M0 320 Q200 120 400 320" fill="none" stroke="#f4f0ea" strokeWidth="3" />
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
        <line
          key={x}
          x1={x}
          y1={320 - Math.sin((x / 400) * Math.PI) * 170}
          x2={x}
          y2="360"
          stroke="#ffffff44"
          strokeWidth="2"
        />
      ))}
      <rect x="0" y="360" width="400" height="120" fill="#1a0d12" />
      <circle cx="70" cy="90" r="18" fill="#ffd7a8" opacity="0.7" />
    </svg>
  )
}

function ScholarArt() {
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full" aria-hidden>
      <rect width="400" height="480" fill="#0a0c14" />
    <g stroke="var(--award-color)" fill="none" strokeWidth="1.4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="200" cy="200" rx={40 + i * 16} ry={18 + i * 6} transform={`rotate(${i * 18} 200 200)`} />
        ))}
      </g>
      <circle cx="200" cy="200" r="8" fill="#fff" />
      <text x="120" y="70" fill="var(--award-color)" fontSize="28" fontFamily="Playfair Display">
        ०
      </text>
      <text x="270" y="330" fill="#fff" fontSize="20" opacity="0.8" fontFamily="Playfair Display">
        π
      </text>
    </svg>
  )
}

function WeaverArt() {
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full" aria-hidden>
      <rect width="400" height="480" fill="#140a08" />
      {Array.from({ length: 14 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${40 + i * 28} Q100 ${20 + i * 28} 200 ${40 + i * 28} T400 ${40 + i * 28}`}
          fill="none"
          stroke={i % 2 ? 'var(--award-color)' : '#f4f0ea'}
          strokeWidth="2"
          opacity={0.55}
        />
      ))}
      <rect x="160" y="80" width="80" height="280" fill="none" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

function KeeperArt() {
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full" aria-hidden>
      <rect width="400" height="480" fill="#071018" />
      <path d="M40 80 L200 40 L360 80 L360 200 Q200 360 40 200 Z" fill="#0e2230" stroke="#8ad4ff" strokeWidth="2" />
      <path
        d="M80 140 Q140 220 200 160 T320 200"
        fill="none"
        stroke="var(--award-color)"
        strokeWidth="4"
      />
      <circle cx="200" cy="168" r="6" fill="#fff" />
      <path d="M70 300 h260 v20 h-260z" fill="#1a3344" />
      <path d="M90 300 l40 -70 h140 l40 70" fill="var(--award-color)" />
    </svg>
  )
}

function CompleterArt() {
  return (
    <svg viewBox="0 0 400 480" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a0a10" />
          <stop offset="100%" stopColor="var(--award-color)" />
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill="url(#cg)" />
      <circle cx="200" cy="210" r="90" fill="none" stroke="#ffd7a8" strokeWidth="3" />
      <circle cx="200" cy="210" r="60" fill="none" stroke="#fff" strokeWidth="1.5" />
      <path d="M200 132 L214 188 L274 188 L226 222 L244 278 L200 246 L156 278 L174 222 L126 188 L186 188 Z" fill="#ffd7a8" />
    </svg>
  )
}
