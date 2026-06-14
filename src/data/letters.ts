/* ════════════════════════════════════════════════════════════
   CARTINHAS / MENSAGENS
   Cada item é um envelope que ela clica pra abrir e ler.
   `title` aparece no envelope fechado; `body` é a carta.
   Pode usar várias linhas — quebras de linha são respeitadas.
   ════════════════════════════════════════════════════════════ */

export type Letter = {
  title: string
  body: string
  /** Assinatura opcional no fim da carta. */
  sign?: string
}

export const letters: Letter[] = [
  {
    title: 'para quando você sentir saudade',
    body: `Se você está lendo isso, respira fundo e lembra:
eu escolho você todos os dias, mesmo nos dias difíceis.
Você é o meu lugar favorito.`,
    sign: 'sua ursinha',
  },
  {
    title: 'a primeira vez que te respondi',
    body: `Eu nem sabia ainda, mas alguma coisa em mim já tinha decidido que te queria para sempre.
E olha só onde a gente chegou.`,
    sign: 'sua mulher',
  },
  {
    title: 'um mês (e tantos sorrisos) depois',
    body: `Obrigada por cada risada, cada abraço (presencial e virtual), cada ligação, cada mensagem, cada "sou sua".
Feliz aniversário de namoro, meu amor.
Que venham muitos outros.`,
    sign: 'eu ♡',
  },
]
