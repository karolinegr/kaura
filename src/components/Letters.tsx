import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from './Section'
import { letters } from '../data/letters'

export default function Letters() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section
      id="cartinhas"
      title="cartinhas"
      subtitle="clique num envelope pra abrir"
      className="bg-gradient-to-b from-cream to-blush/40"
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {letters.map((letter, i) => (
          <motion.button
            key={letter.title}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6, rotate: -1 }}
            className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-rose/30 bg-white p-5 text-center shadow-sm"
          >
            <span className="text-4xl">💌</span>
            <span className="mt-3 font-serif text-xl text-wine">{letter.title}</span>
            <span className="mt-1 text-xs uppercase tracking-widest text-rosedeep/70">abrir</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-plum/70 p-4 backdrop-blur-sm"
          >
            <motion.article
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-[#fffdf8] p-8 shadow-2xl"
              style={{ backgroundImage: 'linear-gradient(180deg,#fffdf8,#fff7ef)' }}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 text-2xl text-plum/40 hover:text-plum"
                aria-label="fechar"
              >
                ×
              </button>
              <h3 className="font-serif text-3xl text-wine">{letters[open].title}</h3>
              <div className="mt-2 h-px w-16 bg-rose/40" />
              <p className="mt-5 whitespace-pre-line font-hand text-2xl leading-relaxed text-plum/90">
                {letters[open].body}
              </p>
              {letters[open].sign && (
                <p className="mt-6 text-right font-hand text-2xl text-rosedeep">
                  {letters[open].sign}
                </p>
              )}
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
