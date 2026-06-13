/* ════════════════════════════════════════════════════════════
   GALERIA DE FOTOS
   Coloque suas fotos na pasta `public/photos/` e liste-as aqui.
   `src`     = caminho a partir de /photos/
   `caption` = legenda curta (aparece na polaroid)
   `message` = mensagem especial que aparece ao CLICAR na foto (zoom).
               Se não tiver, usa a legenda.
   ════════════════════════════════════════════════════════════ */

export type Photo = {
  src: string
  caption: string
  message?: string
}

export const photos: Photo[] = [
  {
    src: '/photos/1-primeira-foto.jpg',
    caption: 'nossa primeira foto 📸',
    message: 'a primeira de muitas, e eu já sabia que era você 💚',
  },
  {
    src: '/photos/2-brownie.jpg',
    caption: 'como tudo começou 🍫',
    message: 'um brownie, um acaso, e a minha vida inteira mudou.',
  },
  {
    src: '/photos/3-encaixe-perfeito.jpg',
    caption: 'o encaixe perfeito 🧩',
    message: 'feitas uma pra outra (você é o meu lugar no mundo).',
  },
  {
    src: '/photos/4-vivendo-em-publico.jpg',
    caption: 'a gente, em público 💕',
    message: 'te amar à vista de todo mundo, sem medo nenhum.',
  },
  {
    src: '/photos/5-amando-em-voz-alta.jpg',
    caption: 'amando em voz alta 🎶',
    message: 'não sei (nem quero) te amar baixinho.',
  },
  {
    src: '/photos/6-estadio.jpg',
    caption: 'primeira vez no estádio ⚽',
    message: 'gritar gol do seu lado é o meu tipo de felicidade 💙',
  },
  {
    src: '/photos/7-beijo.jpg',
    caption: 'o melhor beijo do mundo 💋',
    message: 'o melhor beijo do mundo é, sempre, o seu.',
  },
]
