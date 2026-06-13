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
        className="relative h-40 w-full cursor-pointer [transform-style:preserve-3d]"
      >
        {/* frente */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-sage/30 bg-cream/90 p-4 text-center shadow-sm backdrop-blur-sm [backface-visibility:hidden]">
          <span className="text-5xl drop-shadow-sm">{p.emoji}</span>
          <h3 className="mt-2 font-serif text-lg text-wine">{p.title}</h3>
          <span className="mt-1 text-[10px] uppercase tracking-widest text-moss/60">toque</span>
        </div>
        {/* verso */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-sage/30 bg-cream/90 p-4 text-center shadow-sm backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-hand text-xl leading-snug text-plum/90">{p.text}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Passions() {
  return (
    <Section id="amamos" title="o que a gente ama" subtitle="toque pra revelar 💚">
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
