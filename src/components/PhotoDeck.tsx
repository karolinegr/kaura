import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { AnimatePresence, motion } from 'framer-motion'
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

/** Baralho de fotos estilo polaroid — arraste pra ver a próxima, toque pra ampliar. */
export default function PhotoDeck() {
  const [gone] = useState(() => new Set<number>())
  const [zoom, setZoom] = useState<number | null>(null)
  const [props, api] = useSprings(photos.length, (i) => ({ ...toPos(i), from: fromPos() }))

  useEffect(() => {
    document.body.style.overflow = zoom !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [zoom])

  // fechar o zoom com Esc (a navegação entre fotos é no baralho, arrastando)
  useEffect(() => {
    if (zoom === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom])

  const bind = useDrag(
    ({ args: [index], tap, active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      if (tap) {
        setZoom(index)
        return
      }
      const trigger = vx > 0.2 // velocidade suficiente pra "jogar fora"
      if (!active && trigger) gone.add(index)

      api.start((i) => {
        if (index !== i) return
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * (xDir < 0 ? -1 : 1) : active ? mx : 0
        const rot = mx / 100 + (isGone ? (xDir < 0 ? -1 : 1) * 10 * vx : 0)
        const scale = active ? 1.1 : 1
        return { x, rot, scale, config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 } }
      })

      if (!active && gone.size === photos.length) {
        setTimeout(() => {
          gone.clear()
          api.start((i) => toPos(i))
        }, 600)
      }
    },
    { filterTaps: true },
  )

  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-center font-hand text-lg text-moss/60">
        👇 toque numa foto pra abrir e ler o recadinho
      </p>
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
              className="cursor-pointer touch-none rounded-md bg-white p-3 pb-12 shadow-xl"
            >
              <img
                src={photos[i].src}
                alt={photos[i].caption}
                draggable={false}
                className="h-64 w-60 select-none rounded-sm object-cover"
              />
              <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-[#5a3d28]">
                {photos[i].caption}
              </p>
            </animated.div>
          </animated.div>
        ))}
      </div>
      <p className="mt-3 text-center font-hand text-lg text-moss/60">
        arraste a foto de lado pra trocar 👈👉
      </p>

      {/* zoom da foto + mensagem especial (portal pra ficar acima de tudo) */}
      {createPortal(
        <AnimatePresence>
          {zoom !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-forest/80 p-5 backdrop-blur-sm"
          >
            <motion.figure
              key={zoom}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md rounded-2xl bg-white p-3 pb-5 shadow-2xl"
            >
              <img
                src={photos[zoom].src}
                alt={photos[zoom].caption}
                className="max-h-[60vh] w-full rounded-sm object-contain"
              />
              <figcaption className="mt-3 px-2 text-center font-hand text-2xl text-[#5a3d28]">
                {photos[zoom].message ?? photos[zoom].caption}
              </figcaption>
            </motion.figure>

            {/* convite pra voltar ao baralho e arrastar pra próxima */}
            <button
              onClick={() => setZoom(null)}
              className="mt-5 flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 font-hand text-xl text-white transition-colors hover:bg-white/30"
            >
              👈 volta pra ver a próxima?
            </button>

            <button
              onClick={() => setZoom(null)}
              aria-label="fechar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-3xl text-white transition-colors hover:bg-white/40"
            >
              ×
            </button>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
