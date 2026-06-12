import { useEffect, useRef } from 'react'

type Petal = {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  angle: number
  spin: number
  color: string
}

// cores das pétalas: tulipa, verdes e um toque de azul (as cores de vocês)
const COLORS = ['#d96f93', '#e79bb3', '#a7bd8a', '#6f854f', '#8a5a38', '#5f80a0']

function makePetal(w: number, h: number, top = false): Petal {
  return {
    x: Math.random() * w,
    y: top ? -20 : Math.random() * h,
    size: 8 + Math.random() * 12,
    speed: 0.4 + Math.random() * 1.1,
    drift: (Math.random() - 0.5) * 0.8,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.03,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

/** Pétalas de tulipa caindo suavemente ao fundo do site inteiro. */
export default function Petals({ count = 28 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let petals = Array.from({ length: count }, () => makePetal(w, h))
    let raf = 0

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const drawPetal = (p: Petal) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.fillStyle = p.color
      ctx.globalAlpha = 0.55
      // formato de pétala (duas curvas)
      ctx.beginPath()
      ctx.moveTo(0, -p.size / 2)
      ctx.quadraticCurveTo(p.size / 2, 0, 0, p.size / 2)
      ctx.quadraticCurveTo(-p.size / 2, 0, 0, -p.size / 2)
      ctx.fill()
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.y += p.speed
        p.x += p.drift + Math.sin(p.y * 0.01) * 0.4
        p.angle += p.spin
        if (p.y > h + 20) Object.assign(p, makePetal(w, h, true))
        drawPetal(p)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
