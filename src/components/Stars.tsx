import { useMemo } from 'react'

/** Céu estrelado do modo noite — estrelinhas piscando, lua e estrela cadente. */
export default function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        delay: Math.random() * 4,
        dur: 2.5 + Math.random() * 3,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <span
        className="absolute right-8 top-12 text-5xl"
        style={{ filter: 'drop-shadow(0 0 14px rgba(255,255,200,0.45))' }}
      >
        🌙
      </span>
      <span
        className="absolute left-[8%] top-[16%] h-px w-20 rounded-full bg-gradient-to-r from-white to-transparent"
        style={{ animation: 'shoot 7s ease-in 3s infinite' }}
      />
    </div>
  )
}
