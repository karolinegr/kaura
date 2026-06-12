import { useMemo } from 'react'
import Particles, { ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { loadEmojiShape } from '@tsparticles/shape-emoji'
import type { Engine, ISourceOptions } from '@tsparticles/engine'

async function init(engine: Engine) {
  await loadSlim(engine)
  await loadEmojiShape(engine)
}

function Field({ options }: { options: ISourceOptions }) {
  const { loaded } = useParticlesProvider()
  if (!loaded) return null
  return (
    <Particles id="heart-particles" options={options} className="absolute inset-0 h-full w-full" />
  )
}

/**
 * Campo de partículas (corações + tulipas + gatinho, nas cores de vocês) que
 * reage ao mouse: passa o cursor e elas crescem; clica e nascem mais.
 * Fica de fundo do "momento I Believe".
 */
export default function HeartParticles() {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 36, density: { enable: true } },
        shape: {
          type: 'emoji',
          options: { emoji: { value: ['💚', '💙', '🤎', '🌷', '🐱'] } },
        },
        size: { value: { min: 10, max: 20 } },
        opacity: { value: { min: 0.5, max: 0.9 } },
        move: {
          enable: true,
          speed: 1.1,
          direction: 'none',
          random: true,
          outModes: { default: 'out' },
        },
        rotate: {
          value: { min: -20, max: 20 },
          animation: { enable: true, speed: 4, sync: false },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'bubble' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          bubble: { distance: 160, size: 34, duration: 2, opacity: 1 },
          push: { quantity: 4 },
        },
      },
    }),
    [],
  )

  return (
    <ParticlesProvider init={init}>
      <Field options={options} />
    </ParticlesProvider>
  )
}
