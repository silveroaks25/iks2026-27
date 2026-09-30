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
      <defs>
        <linearGradient id="bridgeBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071a33" />
          <stop offset="100%" stopColor="#123c58" />
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill="url(#bridgeBg)" />
      <circle cx="310" cy="90" r="88" fill="var(--award-color)" opacity="0.12" />
      <path d="M-30 350 Q125 105 430 260" fill="none" stroke="var(--award-color)" strokeWidth="34" opacity="0.9" />
      <path d="M-30 350 Q125 105 430 260" fill="none" stroke="#eff9ff" strokeWidth="2" opacity="0.8" />
      <path d="M0 405 Q170 230 400 340" fill="none" stroke="#29b89c" strokeWidth="5" opacity="0.8" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={42 + i * 42} cy={330 - Math.sin((i / 8) * Math.PI) * 105} r="4" fill="#f6d889" />
      ))}
      <path d="M40 410 L200 160 L360 410" fill="none" stroke="#ffffff33" strokeWidth="1.5" />
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
      <defs>
        <linearGradient id="weaverBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4d182b" />
          <stop offset="100%" stopColor="#102f4c" />
        </linearGradient>
      </defs>
      <rect width="400" height="480" fill="url(#weaverBg)" />
      {Array.from({ length: 11 }).map((_, i) => (
        <path
          key={i}
          d={`M${-50 + i * 40} 0 Q${80 + i * 20} 100 ${-10 + i * 45} 220 T${40 + i * 35} 480`}
          fill="none"
          stroke={i % 3 === 0 ? '#f6d889' : i % 3 === 1 ? 'var(--award-color)' : '#29b89c'}
          strokeWidth={i % 3 === 0 ? 3 : 1.5}
          opacity="0.75"
        />
      ))}
      <path d="M35 80 L200 28 L365 80 L200 132 Z" fill="none" stroke="#f6d889" strokeWidth="2" />
      <path d="M35 400 L200 348 L365 400 L200 452 Z" fill="none" stroke="#29b89c" strokeWidth="2" />
      <circle cx="200" cy="240" r="70" fill="none" stroke="var(--award-color)" strokeWidth="3" />
      <path d="M150 240 L200 190 L250 240 L200 290 Z" fill="var(--award-color)" opacity="0.28" />
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
