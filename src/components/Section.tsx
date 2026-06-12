import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  /** Classe extra pro fundo da seção, se quiser alternar cores. */
  className?: string
}

/** Bloco de seção com título romântico e animação de entrada ao rolar. */
export default function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-4xl font-semibold text-wine sm:text-5xl">{title}</h2>
          {subtitle && <p className="mt-3 font-hand text-2xl text-rosedeep">{subtitle}</p>}
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-rose to-transparent" />
        </motion.div>
        {children}
      </div>
    </section>
  )
}
