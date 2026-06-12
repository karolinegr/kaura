import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import HeartParticles from './HeartParticles'

// A firula clicável: a frase vai crescendo até "every lifetime?".
const steps = [
  { text: 'every night', icon: '🌙' },
  { text: 'every day', icon: '☀️' },
  { text: 'how about every lifetime?', icon: '∞', final: true },
]

function heartBurst() {
  const shapes = ['💚', '🤎', '💙', '🌷'].map((t) => confetti.shapeFromText({ text: t, scalar: 2.2 }))
  confetti({ particleCount: 36, spread: 110, startVelocity: 40, scalar: 2.2, shapes, origin: { y: 0.5 } })
  setTimeout(
    () => confetti({ particleCount: 24, spread: 80, scalar: 1.6, shapes, origin: { y: 0.55 } }),
    140,
  )
}

export default function Lifetime() {
  const [step, setStep] = useState(0)
  const current = steps[step]

  const advance = () => {
    setStep((s) => {
      const next = (s + 1) % steps.length
      if (steps[next].final) heartBurst()
      return next
    })
  }

  return (
    <section
      id="forever"
      className="relative overflow-hidden bg-gradient-to-b from-sand via-blush/40 to-sand px-5 py-24 sm:py-28"
    >
      <HeartParticles />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-serif text-4xl font-semibold text-mix sm:text-5xl">every lifetime</h2>
          <p className="mt-3 font-hand text-2xl text-moss">quanto tempo eu quero você?</p>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-sage to-transparent" />
        </motion.div>

        {/* a caixinha: every night / every day / every lifetime? */}
        <button
          onClick={advance}
          className="group relative mx-auto flex min-h-[160px] w-full max-w-xl flex-col items-center justify-center rounded-3xl border border-sage/40 bg-cream/70 px-6 py-8 shadow-sm backdrop-blur-sm transition-colors hover:bg-cream/90"
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
                className="text-5xl"
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
                className={`mt-3 font-serif font-semibold ${
                  current.final ? 'text-4xl text-mix sm:text-5xl' : 'text-3xl text-forest'
                }`}
              >
                {current.text}
              </span>
            </motion.div>
          </AnimatePresence>
          <span className="mt-5 text-xs uppercase tracking-[0.2em] text-moss/60">
            {current.final ? 'clique pra reviver ♡' : 'clique'}
          </span>
        </button>
      </div>
    </section>
  )
}
