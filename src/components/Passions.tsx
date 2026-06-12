import { motion } from 'framer-motion'
import Section from './Section'
import Tilt from './Tilt'
import { passions } from '../data/passions'

export default function Passions() {
  return (
    <Section id="amamos" title="o que a gente ama" subtitle="as coisas que são a nossa cara">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {passions.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Tilt className="flex h-full flex-col items-center rounded-2xl border border-sage/30 bg-cream/90 p-5 text-center shadow-sm backdrop-blur-sm">
              <span className="text-5xl drop-shadow-sm">{p.emoji}</span>
              <h3 className="mt-3 font-serif text-xl text-wine">{p.title}</h3>
              <p className="mt-1 text-sm text-plum/70">{p.text}</p>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
