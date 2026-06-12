import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import YouTube, { type YouTubeEvent, type YouTubePlayer, type YouTubeProps } from 'react-youtube'
import { config } from '../config'

/**
 * Toca o áudio do vídeo OFICIAL do YouTube (config.youtubeId) num iframe
 * escondido. O play depende de um clique (política dos navegadores), então
 * o botão flutuante é o gatilho.
 */
export default function MusicPlayer() {
  const playerRef = useRef<YouTubePlayer | null>(null)
  const gestureCleanup = useRef<(() => void) | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  // chamadas seguras: o player do YouTube pode estourar erro interno se for
  // chamado antes de estar 100% pronto — o try/catch evita derrubar o app.
  const safePlay = () => {
    try {
      playerRef.current?.playVideo()
    } catch {
      /* player ainda não pronto — ignora */
    }
  }
  const safePause = () => {
    try {
      playerRef.current?.pauseVideo()
    } catch {
      /* idem */
    }
  }

  // Tenta tocar assim que dá. Como o navegador bloqueia som automático, fica
  // tentando a CADA gesto (clique, tecla, scroll, toque) até realmente começar
  // — e só então para de escutar (ver onStateChange).
  useEffect(() => {
    if (!ready) return
    safePlay()
    const onGesture = () => safePlay()
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }))
    gestureCleanup.current = () => {
      events.forEach((e) => window.removeEventListener(e, onGesture))
      gestureCleanup.current = null
    }
    return () => gestureCleanup.current?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  if (!config.youtubeId) return null

  const onReady = (e: YouTubeEvent) => {
    playerRef.current = e.target
    setReady(true)
  }

  const onStateChange = (e: YouTubeEvent<number>) => {
    // 1 = tocando, 2 = pausado, 0 = terminou
    const isPlaying = e.data === 1
    setPlaying(isPlaying)
    if (isPlaying) gestureCleanup.current?.() // começou: para de escutar gestos
  }

  const toggle = () => {
    if (playing) safePause()
    else safePlay()
  }

  const opts: YouTubeProps['opts'] = {
    height: '120',
    width: '200',
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: config.youtubeId, // necessário pro loop de um vídeo só
      modestbranding: 1,
      rel: 0,
    },
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* iframe escondido (fora da tela, mas presente pra poder tocar) */}
      <div className="pointer-events-none fixed -left-[9999px] bottom-0 opacity-0" aria-hidden>
        <YouTube videoId={config.youtubeId} opts={opts} onReady={onReady} onStateChange={onStateChange} />
      </div>

      <motion.button
        onClick={toggle}
        disabled={!ready}
        whileTap={{ scale: 0.9 }}
        title={ready ? (playing ? 'pausar música' : `tocar ${config.musicTitle}`) : 'carregando…'}
        className="flex items-center gap-2 rounded-full border border-sage/40 bg-cream/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md disabled:opacity-60"
      >
        <span className="text-xl">{!ready ? '🎵' : playing ? '⏸️' : '▶️'}</span>
        <span className="hidden text-sm text-wine sm:inline">{config.musicTitle}</span>
        <AnimatePresence>
          {playing && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-end gap-0.5"
            >
              {[0, 1, 2].map((b) => (
                <motion.span
                  key={b}
                  className="w-1 rounded-full bg-moss"
                  animate={{ height: [4, 14, 6, 12, 4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: b * 0.15 }}
                />
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
