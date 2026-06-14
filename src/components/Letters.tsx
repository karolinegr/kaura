import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import Carousel from './Carousel'
import { letters, type Letter } from '../data/letters'

function LetterCard({
  letter,
  flipped,
  onToggle,
}: {
  letter: Letter
  flipped: boolean
  onToggle: () => void
}) {
  return (
    <div className="[perspective:1400px]">
      <motion.div
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-[23rem] w-full cursor-pointer [transform-style:preserve-3d]"
      >
        {/* frente: envelope fechado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-rose/30 bg-cream p-6 text-center shadow-sm [backface-visibility:hidden]">
          <span className="text-6xl">💌</span>
          <span className="mt-4 font-serif text-xl text-wine">{letter.title}</span>
          <span className="mt-2 text-xs uppercase tracking-widest text-rosedeep/70">
            toque para abrir
          </span>
        </div>

        {/* verso: a carta (centralizada, cabe inteira sem rolar) */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-rose/30 bg-cream p-5 text-left shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="font-serif text-xl text-wine">{letter.title}</h3>
          <div className="mt-1 h-px w-12 bg-rose/40" />
          <p className="mt-2 whitespace-pre-line font-hand text-lg leading-snug text-plum/90">
            {letter.body}
          </p>
          {letter.sign && (
            <p className="mt-2 text-right font-hand text-lg text-rosedeep">{letter.sign}</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function Letters() {
  const [open, setOpen] = useState<number | null>(null)

  // clicar em qualquer lugar fora de uma carta vira a aberta de volta
  useEffect(() => {
    if (open === null) return
    const closeAll = () => setOpen(null)
    document.addEventListener('click', closeAll)
    return () => document.removeEventListener('click', closeAll)
  }, [open])

  const toggle = (i: number) => setOpen((cur) => (cur === i ? null : i))

  return (
    <Section
      id="cartinhas"
      title="cartinhas"
      subtitle="toque em um envelope para abrir"
      className="bg-gradient-to-b from-cream to-blush/40"
    >
      {/* celular e tablet: carrossel */}
      <div className="lg:hidden">
        <Carousel
          slides={letters.map((l, i) => (
            <LetterCard key={i} letter={l} flipped={open === i} onToggle={() => toggle(i)} />
          ))}
        />
      </div>

      {/* desktop: grade */}
      <div className="hidden gap-5 lg:grid lg:grid-cols-3">
        {letters.map((l, i) => (
          <LetterCard key={i} letter={l} flipped={open === i} onToggle={() => toggle(i)} />
        ))}
      </div>
    </Section>
  )
}
