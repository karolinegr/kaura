/* ════════════════════════════════════════════════════════════
   MURAL DE TWEETS
   Aqui vão os prints engraçados que representam vocês.
   Coloque as imagens em `public/tweets/` e liste aqui.
   `caption` (opcional) é um comentário fofo embaixo do print.
   ════════════════════════════════════════════════════════════ */

export type Tweet = {
  src: string
  caption?: string
}

export const tweets: Tweet[] = [
  { src: '/tweets/exemplo-1.svg', caption: 'literalmente a gente' },
  { src: '/tweets/exemplo-2.svg', caption: 'você no domingo de manhã' },
  { src: '/tweets/exemplo-3.svg', caption: 'eu tentando ser romântica' },
  { src: '/tweets/exemplo-4.svg' },
]
