import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

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
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 18 },
  }))

  const bind = useDrag(({ down, movement: [mx, my], first, last }) => {
    if (first) setHeld(true)
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
      <animated.button
        {...bind()}
        style={{ x, y, scale, touchAction: 'none' }}
        aria-label="coração arrastável"
        className="cursor-grab select-none text-6xl active:cursor-grabbing"
      >
        {emoji}
      </animated.button>
      <p className={`mt-3 font-hand text-xl ${labelClass}`}>
        {held ? 'pode me levar… mas eu sempre volto 💙' : 'me arrasta? 💙'}
      </p>
    </div>
  )
}
