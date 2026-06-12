import { useState } from 'react'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { photos } from '../data/photos'

// posições iniciais (empilhadas, levemente tortas — cara de polaroid)
const fromPos = () => ({ x: 0, rot: 0, scale: 1.5, y: -1200 })
const toPos = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -8 + Math.random() * 16,
  delay: i * 100,
})
const transform = (rot: number, scale: number) =>
  `perspective(1500px) rotateX(8deg) rotateZ(${rot}deg) scale(${scale})`

/** Baralho de fotos estilo polaroid — arraste a de cima pra "jogar" e ver a próxima. */
export default function PhotoDeck() {
  const [gone] = useState(() => new Set<number>())
  const [props, api] = useSprings(photos.length, (i) => ({ ...toPos(i), from: fromPos() }))

  const bind = useDrag(
    ({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.2 // velocidade suficiente pra "jogar fora"
      if (!active && trigger) gone.add(index)

      api.start((i) => {
        if (index !== i) return
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * (xDir < 0 ? -1 : 1) : active ? mx : 0
        const rot = mx / 100 + (isGone ? (xDir < 0 ? -1 : 1) * 10 * vx : 0)
        const scale = active ? 1.1 : 1
        return {
          x,
          rot,
          scale,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        }
      })

      // quando todas saíram, embaralha e devolve
      if (!active && gone.size === photos.length) {
        setTimeout(() => {
          gone.clear()
          api.start((i) => toPos(i))
        }, 600)
      }
    },
  )

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[420px] w-full max-w-sm items-center justify-center">
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div
            key={photos[i].src}
            className="absolute flex items-center justify-center will-change-transform"
            style={{ x, y }}
          >
            <animated.div
              {...bind(i)}
              style={{ transform: interpolate([rot, scale], transform), touchAction: 'none' }}
              className="cursor-grab touch-none rounded-md bg-white p-3 pb-12 shadow-xl active:cursor-grabbing"
            >
              <img
                src={photos[i].src}
                alt={photos[i].caption}
                draggable={false}
                className="h-64 w-60 select-none rounded-sm object-cover"
              />
              <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-cocoa">
                {photos[i].caption}
              </p>
            </animated.div>
          </animated.div>
        ))}
      </div>
      <p className="mt-6 font-hand text-xl text-moss">
        arraste a foto de cima pra jogar e ver a próxima 💫
      </p>
    </div>
  )
}
