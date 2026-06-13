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
  { src: '/tweets/1-como-nos-achamos.png', caption: 'como a gente se achou nesse mundão. valeu Agnes!' },
  { src: '/tweets/2-vai-que-cola.png', caption: 'uma hora consigo esse autógrafo 💘' },
  { src: '/tweets/3-coalinha.png', caption: 'minha coalinha favorita 🐨' },
  { src: '/tweets/4-distancia.png', caption: 'perto, mesmo com a distância 💌' },
  { src: '/tweets/5-tribunal.png', caption: 'sentença: te amar pra sempre  ⚖️' },
  { src: '/tweets/6-nosso-futuro.png', caption: 'o nosso futuro é a minha parte favorita 🏡' },
]
