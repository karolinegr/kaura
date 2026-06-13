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
    src: '/photos/exemplo-1.svg',
    caption: 'o dia em que tudo começou',
    message: 'aqui começou a melhor parte da minha vida 💚',
  },
  {
    src: '/photos/exemplo-2.svg',
    caption: 'aquele sorriso',
    message: 'esse sorriso é o meu lugar favorito no mundo 🌷',
  },
  {
    src: '/photos/exemplo-3.svg',
    caption: 'nossa primeira viagem',
    message: 'pra qualquer lugar, desde que seja com você ✈️',
  },
  {
    src: '/photos/exemplo-4.svg',
    caption: 'café da manhã preguiçoso',
    message: 'meus dias preferidos são os mais bobos com você ☕',
  },
  {
    src: '/photos/exemplo-5.svg',
    caption: 'a gente boba',
    message: 'rir com você é a minha coisa favorita 🐱',
  },
  {
    src: '/photos/exemplo-6.svg',
    caption: 'pôr do sol favorito',
    message: 'todo pôr do sol fica melhor do seu lado 💙',
  },
]
