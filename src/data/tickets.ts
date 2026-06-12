/* ════════════════════════════════════════════════════════════
   VALES / TICKETS RESGATÁVEIS
   Cupons que ela resgata com a senha (config.ticketPassword).
   Depois de resgatado, fica salvo no navegador dela.
   `id` precisa ser ÚNICO (é como o site lembra o que já foi resgatado).
   `emoji` é o ícone; `title` o nome do vale; `description` os detalhes.
   ════════════════════════════════════════════════════════════ */

export type Ticket = {
  id: string
  emoji: string
  title: string
  description: string
}

export const tickets: Ticket[] = [
  {
    id: 'jantar',
    emoji: '🍝',
    title: 'vale um jantar',
    description: 'Um jantar especial, do seu lugar favorito, por minha conta.',
  },
  {
    id: 'cinema',
    emoji: '🎬',
    title: 'vale uma sessão de cinema',
    description: 'Você escolhe o filme. Eu levo a pipoca (e o colo).',
  },
  {
    id: 'massagem',
    emoji: '💆',
    title: 'vale uma massagem',
    description: 'Trinta minutos só de relaxar. Sem reclamar. Prometo.',
  },
  {
    id: 'viagem',
    emoji: '✈️',
    title: 'vale uma escapada',
    description: 'Um fim de semana só nosso, no destino que você quiser.',
  },
  {
    id: 'preguica',
    emoji: '🛋️',
    title: 'vale um dia de preguiça',
    description: 'Nada de compromissos. Só a gente, cobertor e maratona.',
  },
  {
    id: 'desejo',
    emoji: '⭐',
    title: 'vale um pedido livre',
    description: 'Qualquer coisa que você quiser. Vale-curinga do amor.',
  },
]
