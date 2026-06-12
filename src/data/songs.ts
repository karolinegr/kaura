/* ════════════════════════════════════════════════════════════
   TRILHA SONORA DE NÓS
   Os trechos são curtos de propósito (um pedacinho de cada música).
   `accent` aceita: 'blue' | 'tulip' | 'moss' | 'gold' (cor do card).
   ════════════════════════════════════════════════════════════ */

export type Song = {
  emoji: string
  title: string
  artist: string
  /** Trecho curto da letra (cada string é uma linha). */
  lines: string[]
  /** Comentário fofo embaixo. */
  note: string
  accent: 'blue' | 'tulip' | 'moss' | 'gold'
}

export const songs: Song[] = [
  {
    emoji: '💙',
    title: 'I Believe',
    artist: 'Jonas Brothers',
    lines: [
      '“Well, call me crazy',
      'and people saying that we move too fast',
      'but I’ve been waiting for a reason',
      'ain’t no turning back”',
    ],
    note: 'a nossa música 🎧',
    accent: 'blue',
  },
  {
    emoji: '🌅',
    title: 'Daylight',
    artist: 'Taylor Swift',
    lines: ['“I once believed love would be', 'black and white… but it’s golden”'],
    note: 'cada trecho dela diz alguma coisa nossa ✨',
    accent: 'gold',
  },
  {
    emoji: '🌷',
    title: 'Trevo (Tu)',
    artist: 'Anavitória',
    lines: ['“Tu é trevo de quatro folhas', 'é manhã de domingo à toa”'],
    note: 'do jeitinho que você ama 💚',
    accent: 'moss',
  },
  {
    emoji: '🍃',
    title: 'Singular',
    artist: 'Anavitória',
    lines: ['“É tão particular o meu encontro', 'quando é com você”'],
    note: 'porque com você tudo é particular 🤎',
    accent: 'tulip',
  },
]
