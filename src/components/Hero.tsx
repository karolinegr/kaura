import { motion } from 'framer-motion'
import { config } from '../config'
import { useTimeTogether, type Duration } from '../hooks/useTimeTogether'
import Typewriter from './Typewriter'

const units: { key: keyof Duration; label: string }[] = [
  { key: 'months', label: 'meses' },
  { key: 'days', label: 'dias' },
  { key: 'hours', label: 'horas' },
  { key: 'minutes', label: 'min' },
  { key: 'seconds', label: 'seg' },
]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function Hero() {
  const t = useTimeTogether(config.startDate)

  return (
    <section
      id="topo"
      className="relative flex min-h-[100svh] flex-col items-center justify-center bg-gradient-to-b from-blush/70 via-sand/40 to-transparent px-5 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-hand text-2xl text-moss sm:text-3xl"
      >
        <Typewriter phrases={config.taglines} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-2 font-serif text-6xl font-semibold leading-none text-mix sm:text-8xl"
      >
        {config.siteTitle}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-4 flex flex-col items-center gap-1"
      >
        <p className="rounded-full bg-cream/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-moss">
          {config.shipFormula}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mt-10"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-moss/80">juntas há</p>
        <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
          {units.map((u) => (
            <div
              key={u.key}
              className="min-w-[52px] rounded-2xl border border-sage/40 bg-cream/80 px-2.5 py-3 shadow-sm backdrop-blur-sm sm:min-w-[84px] sm:px-4"
            >
              <div className="font-serif text-2xl font-semibold tabular-nums text-forest sm:text-5xl">
                {pad(t[u.key])}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-cocoa/50 sm:text-xs">
                {u.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 font-hand text-xl text-brown">
          são {t.totalDays.toLocaleString('pt-BR')} dias de nós ♡
        </p>
      </motion.div>

      <motion.a
        href="#distancia"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 flex flex-col items-center text-moss/70 transition-colors hover:text-moss"
      >
        <span className="text-xs uppercase tracking-widest">role pra baixo</span>
        <span className="mt-1 animate-bounce text-2xl">⌄</span>
      </motion.a>
    </section>
  )
}
