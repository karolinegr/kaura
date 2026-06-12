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
  { href: '#vales', label: 'vales' },
]

type Props = {
  night: boolean
  onToggleTheme: () => void
}

export default function Navbar({ night, onToggleTheme }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 py-3">
      <nav className="flex max-w-[94vw] items-center gap-1 overflow-x-auto whitespace-nowrap rounded-full border border-sage/40 bg-sand/85 px-2 py-1.5 shadow-sm backdrop-blur-md [scrollbar-width:none] sm:gap-2 sm:px-4">
        <a href="#topo" className="shrink-0 px-2 font-serif text-lg font-semibold text-mix sm:text-xl">
          {config.siteTitle} <span className="text-tulip">♡</span>
        </a>
        <span className="mx-1 hidden h-4 w-px shrink-0 bg-sage/40 sm:block" />
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="shrink-0 rounded-full px-2.5 py-1 text-sm text-cocoa/70 transition-colors hover:bg-blush hover:text-forest sm:px-3"
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={onToggleTheme}
          aria-label={night ? 'modo dia' : 'modo noite'}
          title={night ? 'modo dia ☀️' : 'modo noite 🌙'}
          className="ml-1 shrink-0 rounded-full border border-sage/40 px-2 py-1 text-base transition-colors hover:bg-blush"
        >
          {night ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  )
}
