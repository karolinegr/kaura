import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config'

const links = [
  { href: '#distancia', label: 'distância' },
  { href: '#galeria', label: 'fotos' },
  { href: '#musicas', label: 'músicas' },
  { href: '#forever', label: 'forever ∞' },
  { href: '#cartinhas', label: 'cartinhas' },
  { href: '#tweets', label: 'tweets' },
  { href: '#amamos', label: 'amamos' },
  { href: '#cruzadas', label: 'cruzadas' },
  { href: '#surpresa', label: 'surpresa' },
]

type Props = {
  night: boolean
  onToggleTheme: () => void
}

function ThemeButton({ night, onToggleTheme }: Props) {
  return (
    <button
      onClick={onToggleTheme}
      aria-label={night ? 'modo dia' : 'modo noite'}
      title={night ? 'modo dia ☀️' : 'modo noite 🌙'}
      className="shrink-0 rounded-full border border-sage/40 px-2 py-1 text-base transition-colors hover:bg-blush"
    >
      {night ? '☀️' : '🌙'}
    </button>
  )
}

export default function Navbar({ night, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)

  // trava o scroll do fundo enquanto o menu está aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 py-3">
      <nav className="flex w-full max-w-md items-center justify-between gap-1 rounded-full border border-sage/50 bg-sand/95 px-3 py-1.5 shadow-md backdrop-blur-md lg:w-auto lg:max-w-none lg:gap-2 lg:px-4">
        <a href="#topo" className="shrink-0 px-1 font-serif text-lg font-semibold text-mix sm:text-xl">
          {config.siteTitle} <span className="text-tulip">♡</span>
        </a>

        {/* links no desktop (telas grandes) */}
        <div className="hidden items-center gap-1 lg:flex">
          <span className="mx-1 h-4 w-px shrink-0 bg-sage/40" />
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full px-3 py-1 text-sm text-cocoa/70 transition-colors hover:bg-blush hover:text-forest"
            >
              {l.label}
            </a>
          ))}
          <ThemeButton night={night} onToggleTheme={onToggleTheme} />
        </div>

        {/* tema + hambúrguer no celular/tablet */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeButton night={night} onToggleTheme={onToggleTheme} />
          <button
            onClick={() => setOpen(true)}
            aria-label="abrir menu"
            className="flex h-8 w-9 flex-col items-center justify-center gap-1 rounded-full border border-sage/50 bg-cream/60"
          >
            <span className="h-0.5 w-4 rounded-full bg-forest" />
            <span className="h-0.5 w-4 rounded-full bg-forest" />
            <span className="h-0.5 w-4 rounded-full bg-forest" />
          </button>
        </div>
      </nav>

      {/* overlay do menu (celular/tablet) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-sand/97 backdrop-blur-md lg:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="fechar menu"
              className="absolute right-6 top-6 text-4xl leading-none text-forest"
            >
              ×
            </button>
            <span className="mb-6 font-serif text-4xl font-semibold text-mix">
              {config.siteTitle} <span className="text-tulip">♡</span>
            </span>
            <nav className="flex max-h-[70vh] flex-col items-center gap-0.5 overflow-y-auto">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.035 }}
                  className="rounded-full px-6 py-1.5 font-serif text-2xl text-forest active:bg-blush"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
