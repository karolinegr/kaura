import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { passions, type Passion } from '../data/passions'

function PassionCard({ p }: { p: Passion }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="[perspective:1000px]">
      <motion.div
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-44 w-full cursor-pointer [transform-style:preserve-3d]"
      >
        {/* frente: cluster de emojis com balançadinho */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-sage/30 bg-cream/90 p-3 text-center shadow-sm backdrop-blur-sm [backface-visibility:hidden]">
          {/* selo de cantinho: deixa claro que o card VIRA (não é quiz) */}
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-mix/10 px-2 py-0.5 text-[10px] font-semibold text-mix">
            <motion.span
              className="inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              ↻
            </motion.span>
            virar
          </span>
          <div className="flex max-w-[7rem] flex-wrap items-center justify-center gap-1.5">
            {p.emojis.map((e, i) => (
              <motion.span
                key={i}
                className="text-2xl sm:text-3xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
          <h3 className="mt-2 font-serif text-sm leading-tight text-wine sm:text-base">{p.title}</h3>
          <span className="mt-1 rounded-full bg-moss/10 px-2 py-0.5 text-[10px] font-medium text-moss">
            👆 toque para virar
          </span>
        </div>

        {/* verso: o textinho */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-sage/30 bg-cream/90 p-4 text-center shadow-sm backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-hand text-base leading-snug text-plum/90 sm:text-lg">{p.text}</p>
          <span className="mt-2 text-[10px] uppercase tracking-widest text-moss/50">↺ toque para voltar</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function Passions() {
  return (
    <Section
      id="amamos"
      title="o que a gente ama"
      subtitle="cada cartãozinho vira quando você toca: vem espiar o que tem atrás"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {passions.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <PassionCard p={p} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
