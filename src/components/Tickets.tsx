import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Section from './Section'
import Carousel from './Carousel'
import { config } from '../config'
import { tickets, type Ticket } from '../data/tickets'
import { useLocalStorage } from '../hooks/useLocalStorage'

function celebrate() {
  const colors = ['#d96f93', '#a7bd8a', '#6f854f', '#5f80a0', '#c79a4a']
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors })
  setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0 }, colors }), 150)
  setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1 }, colors }), 150)
}

function Cutouts() {
  return (
    <>
      <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-sand" />
      <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-sand" />
    </>
  )
}

function TicketCard({
  ticket,
  redeemed,
  onRedeem,
}: {
  ticket: Ticket
  redeemed: boolean
  onRedeem: (t: Ticket) => void
}) {
  return (
    <div className="h-full [perspective:1400px]">
      <motion.div
        animate={{ rotateY: redeemed ? 180 : 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-56 w-full [transform-style:preserve-3d]"
      >
        {/* frente: bloqueado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-sage/50 bg-cream p-6 text-center shadow-sm [backface-visibility:hidden]">
          <Cutouts />
          <div className="text-5xl">{ticket.emoji}</div>
          <h3 className="mt-2 font-serif text-2xl text-wine">{ticket.title}</h3>
          <p className="mt-1 text-sm text-cocoa/40">🔒 use a senha pra revelar</p>
          <button
            onClick={() => onRedeem(ticket)}
            className="mt-3 rounded-full bg-mix px-5 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            resgatar
          </button>
        </div>

        {/* verso: resgatado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gold/60 bg-cream p-6 text-center shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Cutouts />
          <div className="text-5xl">{ticket.emoji}</div>
          <h3 className="mt-2 font-serif text-xl text-wine">{ticket.title}</h3>
          <p className="mt-1 text-sm text-plum/70">{ticket.description}</p>
          <span className="mt-3 inline-block rotate-[-8deg] rounded-md border-2 border-gold px-3 py-1 font-serif text-sm font-semibold uppercase tracking-wider text-gold">
            resgatado ✓
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default function Tickets() {
  const [redeemed, setRedeemed] = useLocalStorage<string[]>('kaura:redeemed', [])
  const [active, setActive] = useState<Ticket | null>(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const openModal = (ticket: Ticket) => {
    setActive(ticket)
    setInput('')
    setError(false)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!active) return
    if (input.trim().toLowerCase() === config.ticketPassword.trim().toLowerCase()) {
      setRedeemed((prev) => (prev.includes(active.id) ? prev : [...prev, active.id]))
      setActive(null)
      celebrate()
    } else {
      setError(true)
    }
  }

  const cards = tickets.map((t) => (
    <TicketCard key={t.id} ticket={t} redeemed={redeemed.includes(t.id)} onRedeem={openModal} />
  ))

  return (
    <Section
      id="vales"
      title="seus vales"
      subtitle="resgate com a nossa senha secreta"
      className="bg-gradient-to-b from-blush/50 to-sand"
    >
      {/* celular: carrossel */}
      <div className="sm:hidden">
        <Carousel slides={cards} />
      </div>

      {/* desktop: grade */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
          >
            <TicketCard ticket={t} redeemed={redeemed.includes(t.id)} onRedeem={openModal} />
          </motion.div>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest/70 p-4 backdrop-blur-sm"
          >
            <motion.form
              onSubmit={submit}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, x: error ? [0, -8, 8, -6, 6, 0] : 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: error ? 0.4 : 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-cream p-7 text-center shadow-2xl"
            >
              <div className="text-4xl">{active.emoji}</div>
              <h3 className="mt-2 font-serif text-2xl text-wine">{active.title}</h3>
              <p className="mt-1 text-sm text-cocoa/60">digite a nossa senha secreta pra resgatar</p>
              <input
                autoFocus
                type="password"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setError(false)
                }}
                placeholder="senha do amor"
                className={`mt-5 w-full rounded-full border-2 px-5 py-3 text-center outline-none transition-colors ${
                  error ? 'border-tulip bg-tulip/10' : 'border-sage/50 focus:border-moss'
                }`}
              />
              {error && <p className="mt-2 text-sm text-tulip">hmm, não é essa 🙈 tenta de novo</p>}
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="flex-1 rounded-full border border-sage/50 py-2.5 text-sm text-cocoa/70 hover:bg-blush"
                >
                  cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-mix py-2.5 text-sm font-medium text-white hover:brightness-105"
                >
                  resgatar ♡
                </button>
              </div>
            </motion.form>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </Section>
  )
}
