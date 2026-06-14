import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Section from './Section'
import { config } from '../config'

/** Estrelinhas piscando dentro do bloco. */
function Sparkles({ count = 26 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
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
    </div>
  )
}

type Props = {
  night: boolean
  onReveal: () => void
}

export default function Surprise({ night, onReveal }: Props) {
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [zoom])

  return (
    <>
      <Section id="surpresa" title="uma surpresa" subtitle="✨ tem algo escondido aqui ✨">
      <div className="mx-auto max-w-2xl [perspective:1200px]">
        <AnimatePresence mode="wait">
          {night ? (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, rotateX: -25, scale: 0.92 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-3xl border border-[#3c5d7d] bg-gradient-to-b from-[#0a0f22] to-[#171f3d] p-6 text-center shadow-2xl sm:p-10"
            >
              <Sparkles count={34} />
              <div className="relative z-10">
                <p className="font-hand text-2xl text-[#9fc0ea]">a revelação ✨</p>
                <h3 className="mt-1 font-serif text-3xl leading-tight text-[#f5f0e6] sm:text-4xl">
                  O céu da nossa primeira vez 💫
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#cdd6e6] sm:text-base">
                  Era <b className="text-[#f5f0e6]">exatamente assim</b> que o céu estava sobre{' '}
                  {config.firstKiss.place.split(',')[0]} no dia em que nos beijamos a primeira vez.
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.3, delay: 0.25 }}
                  className="relative mx-auto mt-7 w-64 sm:w-80"
                >
                  {/* brilho atrás do mapa */}
                  <div className="absolute inset-0 animate-pulse rounded-full bg-[#9fc0ea]/20 blur-2xl" />
                  <img
                    src="/sky.png"
                    alt={`mapa do céu de ${config.firstKiss.place}`}
                    onClick={() => setZoom(true)}
                    className="relative w-full cursor-zoom-in drop-shadow-[0_0_28px_rgba(159,192,234,0.45)] transition-transform hover:scale-[1.02]"
                  />
                </motion.div>

                <div className="mt-7 flex flex-col items-center gap-1 text-[#cdd6e6]">
                  <span className="text-sm uppercase tracking-[0.25em]">{config.firstKiss.place}</span>
                  <span className="text-sm text-[#cdd6e6]/70">
                    {config.firstKiss.date} · {config.firstKiss.coords}
                  </span>
                  <span className="mt-2 text-xs text-[#9fc0ea]/70">🔭 toque no mapa para ampliar</span>
                  <span className="mt-3 font-hand text-xl text-[#9fc0ea]">
                    as estrelas estavam todas sorrindo para gente ♡
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="teaser"
              onClick={onReveal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group relative block w-full overflow-hidden rounded-3xl border border-[#3c5d7d] bg-gradient-to-b from-[#0f1730] to-[#1e2748] p-10 text-center shadow-xl"
            >
              <Sparkles count={20} />
              <div className="relative z-10 flex flex-col items-center">
                <motion.span
                  className="text-6xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🌙
                </motion.span>
                <p className="mt-5 font-serif text-xl text-[#f5f0e6] sm:text-2xl">
                  mude para o modo noturno
                </p>
                <p className="font-serif text-xl text-[#f5f0e6] sm:text-2xl">e tenha uma surpresa ✨</p>
                <span className="mt-5 rounded-full border border-[#9fc0ea]/40 px-4 py-1.5 text-sm text-[#9fc0ea] transition-colors group-hover:bg-[#9fc0ea]/15">
                  toque aqui — ou no 🌙 lá em cima
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Section>

      {createPortal(
        <AnimatePresence>
          {zoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoom(false)}
              className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-[#070b18]/95 p-5 backdrop-blur-sm"
            >
              <motion.img
                src="/sky.png"
                alt={`mapa do céu de ${config.firstKiss.place}`}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[80vh] max-w-[92vw] drop-shadow-[0_0_45px_rgba(159,192,234,0.5)]"
              />
              <p className="text-center font-hand text-xl text-[#9fc0ea]">
                {config.firstKiss.place} · {config.firstKiss.date}
              </p>
              <button
                onClick={() => setZoom(false)}
                aria-label="fechar"
                className="absolute right-5 top-5 text-3xl text-white/80 hover:text-white"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
