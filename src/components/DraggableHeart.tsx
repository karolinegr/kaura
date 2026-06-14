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
        {/* o próprio coração pulsando em eco — mesma forma e alinhamento do emoji */}
        {[0, 0.75].map((delay) => (
          <motion.span
            key={delay}
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-7xl leading-none"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: [1, 2], opacity: [0.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay }}
          >
            {emoji}
          </motion.span>
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
      <p className={`mt-3 font-hand text-xl ${labelClass}`}>
        {held ? 'mas pode me jogar pra qualquer canto do mapa que eu sempre volto pra você. ♡' : 'me arrasta?'}
      </p>
    </div>
  )
}
