import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { motion } from 'framer-motion'

type Props = {
  /** Emoji do coração (padrão azul 💙). */
  emoji?: string
  /** Classe de cor do texto de apoio. */
  labelClass?: string
}

/**
 * Um coração que você arrasta pela tela — e que sempre volta, com mola,
 * pro lugar de origem. ("eu sempre volto pra você")
 */
const IDLE_LABEL = 'me arrasta?'
const HELD_LABEL = 'mas pode me jogar para qualquer canto do mapa que eu sempre volto para você. ♡'

export default function DraggableHeart({ emoji = '💙', labelClass = 'text-blue' }: Props) {
  const [held, setHeld] = useState(false)
  // depois que a pessoa interage a 1ª vez, paramos a "isca" de movimento
  const [touched, setTouched] = useState(false)
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 18 },
  }))

  const bind = useDrag(({ down, movement: [mx, my], first, last }) => {
    if (first) {
      setHeld(true)
      setTouched(true)
    }
    if (last) setHeld(false)
    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      scale: down ? 1.25 : 1,
      immediate: (key) => down && (key === 'x' || key === 'y'),
    })
  })

  return (
    <div className="flex flex-col items-center">
      <div className={`relative h-24 w-24 ${labelClass}`}>
        {/* eco do coração em SVG (vetor): escala lisa, sem rasterizar nem dar
            flash como o emoji. Levemente borrado, vira um brilho/sombra suave. */}
        {[0, 1.2].map((delay) => (
          <motion.svg
            key={delay}
            aria-hidden
            viewBox="0 0 24 24"
            fill="#7da1c5"
            className="pointer-events-none absolute inset-0 m-auto h-24 w-24 blur-[2px]"
            style={{ transformOrigin: '50% 50%' }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.6, 2], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay, times: [0, 0.7, 1] }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        ))}
        <animated.button
          {...bind()}
          style={{ x, y, scale, touchAction: 'none' }}
          aria-label="coração arrastável — segure e arraste"
          className="absolute inset-0 flex cursor-grab select-none items-center justify-center text-7xl leading-none active:cursor-grabbing"
        >
          {/* balançadinho de isca enquanto ninguém pegou ainda */}
          <motion.span
            className="inline-block leading-none"
            animate={touched || held ? { rotate: 0 } : { rotate: [0, -14, 14, -14, 14, 0] }}
            transition={
              touched || held
                ? { duration: 0.2 }
                : { duration: 1.4, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }
            }
          >
            {emoji}
          </motion.span>
        </animated.button>
      </div>
      {/* o texto longo (invisível) reserva a altura sempre — sem reflow ao arrastar */}
      <div className={`mt-3 grid max-w-xs place-items-center text-center font-hand text-xl ${labelClass}`}>
        <span aria-hidden className="invisible [grid-area:1/1]">{HELD_LABEL}</span>
        <span className="[grid-area:1/1]">{held ? HELD_LABEL : IDLE_LABEL}</span>
      </div>
    </div>
  )
}
