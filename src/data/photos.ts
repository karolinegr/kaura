/* ════════════════════════════════════════════════════════════
   GALERIA DE FOTOS
   Coloque suas fotos na pasta `public/photos/` e liste-as aqui.
   `src` é o caminho a partir de /photos/.  `caption` é a legenda.
   Ex.: { src: '/photos/praia.jpg', caption: 'nossa primeira viagem' }
   ════════════════════════════════════════════════════════════ */

export type Photo = {
  src: string
  caption: string
}

export const photos: Photo[] = [
  { src: '/photos/exemplo-1.svg', caption: 'o dia em que tudo começou' },
  { src: '/photos/exemplo-2.svg', caption: 'aquele sorriso' },
  { src: '/photos/exemplo-3.svg', caption: 'nossa primeira viagem' },
  { src: '/photos/exemplo-4.svg', caption: 'café da manhã preguiçoso' },
  { src: '/photos/exemplo-5.svg', caption: 'a gente boba' },
  { src: '/photos/exemplo-6.svg', caption: 'pôr do sol favorito' },
]
