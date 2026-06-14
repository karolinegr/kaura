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
  const startedRef = useRef(false) // já desmutou e tocou com som
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  // chamadas seguras: o player do YouTube pode estourar erro interno se for
  // chamado antes de estar 100% pronto — o try/catch evita derrubar o app.
  // Desmuta + sobe volume + toca: é o que transforma o autoplay mudo em som.
  const startAudible = () => {
    try {
      const p = playerRef.current
      if (!p) return
      p.unMute()
      p.setVolume(100)
      p.playVideo()
      startedRef.current = true
      setPlaying(true)
      gestureCleanup.current?.() // os gestos válidos desmutam de fato: pode parar de escutar
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

  // O vídeo já começa em AUTOPLAY MUDO (os navegadores permitem isso). No
  // PRIMEIRO gesto da pessoa (clique, tecla, scroll, toque) a gente desmuta e
  // garante o play — então a música vira som no primeiro toque na página.
  useEffect(() => {
    if (!ready) return
    const onGesture = () => startAudible()
    // só gestos que o navegador aceita como "ativação" pra liberar áudio
    // (clique, tecla, toque). scroll/roda NÃO conta — por isso fica de fora.
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
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
    // só conta como "tocando" (com som) depois de desmutar no 1º gesto —
    // assim os bauzinhos não aparecem enquanto está só no autoplay mudo.
    setPlaying(isPlaying && startedRef.current)
    if (isPlaying && startedRef.current) gestureCleanup.current?.() // já tem som: para de escutar
  }

  const toggle = () => {
    if (playing) {
      safePause()
      setPlaying(false)
    } else {
      startAudible() // a confirmação (isMuted) marca "tocando" quando o som entra
    }
  }

  const opts: YouTubeProps['opts'] = {
    height: '120',
    width: '200',
    playerVars: {
      autoplay: 1, // autoplay MUDO (permitido); o som entra no 1º gesto
      mute: 1,
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
      <div className="pointer-events-none fixed bottom-0 left-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <YouTube videoId={config.youtubeId} opts={opts} onReady={onReady} onStateChange={onStateChange} />
      </div>

      <motion.button
        onClick={toggle}
        disabled={!ready}
        whileTap={{ scale: 0.9 }}
        animate={ready && !playing ? { scale: [1, 1.07, 1] } : { scale: 1 }}
        transition={ready && !playing ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
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
