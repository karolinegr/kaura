import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import HeartParticles from './HeartParticles'

// A firula clicável: a frase vai crescendo até "every lifetime?".
const steps = [
  { text: 'QUANTO TEMPO EU QUERO VOCÊ?', icon: '⏳' },
  { text: 'every night', icon: '🌚' },
  { text: 'every day', icon: '🌞' },
  { text: 'how about every lifetime?', icon: '∞', final: true },
]

function heartBurst() {
  const colors = ['#d96f93', '#a7bd8a', '#6f854f', '#5f80a0', '#c79a4a']
  try {
    const shapes = ['💚', '🤎', '💙', '🌷'].map((t) => confetti.shapeFromText({ text: t, scalar: 2.2 }))
    confetti({ particleCount: 36, spread: 110, startVelocity: 40, scalar: 2.2, shapes, origin: { y: 0.5 } })
    setTimeout(
      () => confetti({ particleCount: 24, spread: 80, scalar: 1.6, shapes, origin: { y: 0.55 } }),
      140,
    )
  } catch {
    // fallback caso shapeFromText não funcione no navegador
    confetti({ particleCount: 60, spread: 110, startVelocity: 40, colors, origin: { y: 0.5 } })
  }
}

export default function Lifetime() {
  const [step, setStep] = useState(0)
  const current = steps[step]

  const advance = () => {
    const next = (step + 1) % steps.length
    setStep(next)
    if (steps[next].final) heartBurst()
  }

  return (
    <section
      id="forever"
      className="relative overflow-hidden bg-gradient-to-b from-sand via-blush/40 to-sand px-5 py-24 sm:py-28"
    >
      <HeartParticles />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <button
          onClick={advance}
          className="group relative mx-auto flex min-h-[260px] w-full max-w-2xl flex-col items-center justify-center rounded-3xl border border-sage/40 bg-cream/70 px-8 py-12 shadow-sm backdrop-blur-sm transition-colors hover:bg-cream/90 sm:min-h-[340px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.8, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <motion.span
                className="text-6xl sm:text-7xl"
                animate={current.final ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  current.final
                    ? { duration: 6, repeat: Infinity, ease: 'linear' }
                    : { duration: 0.3 }
                }
              >
                {current.icon}
              </motion.span>
              <span
                className={`mt-4 font-serif font-semibold ${
                  current.final ? 'text-4xl text-mix sm:text-6xl' : 'text-3xl text-forest sm:text-4xl'
                }`}
              >
                {current.text}
              </span>
            </motion.div>
          </AnimatePresence>
          {/* bolinhas de progresso: deixa claro que são várias etapas */}
          <div className="mt-6 flex items-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-mix' : i < step ? 'w-2 bg-moss/50' : 'w-2 bg-sage/40'
                }`}
              />
            ))}
          </div>
          <motion.span
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mix/10 px-4 py-1.5 text-sm font-medium text-mix"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {current.final ? '↺ toque pra reviver desde o começo' : 'toque pra continuar →'}
          </motion.span>
        </button>
      </div>
    </section>
  )
}
