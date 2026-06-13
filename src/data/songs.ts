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
    note: 'só um amor de verdade merece essa dedicação 🎧',
    accent: 'blue',
  },
  {
    emoji: '🎇',
    title: 'Explodir',
    artist: 'ANAVITÓRIA',
    lines: [
      '“A gente se escolhe todo dia',
      'E eu te escolheria mais milhões de vidas',
      'Porque uma só é pouco com você, amor',
      'E eu quero tudo que eu puder viver com você”',
    ],
    note: 'minha mulher 🤎',
    accent: 'tulip',
  },
  {
    emoji: '🌅',
    title: 'Daylight',
    artist: 'Taylor Swift',
    lines: ['“I once believed love would be', 'black and white… but it’s golden”'],
    note: 'nosso amor veio para nos mostrar coisas incríveis ✨',
    accent: 'gold',
  },
  {
    emoji: '🍀',
    title: 'Sorte',
    artist: 'Gal Costa (part. Caetano Veloso)',
    lines: [
      '“Meu amor, você me dá sorte',
      'Meu amor, você me dá sorte',
      'Meu amor, você me dá sorte de cara”',
    ],
    note: 'sortuda sou eu que te encontrei 🤞🏼',
    accent: 'moss',
  },
]
