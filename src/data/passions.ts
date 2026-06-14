/* ════════════════════════════════════════════════════════════
   O QUE A GENTE AMA (em comum)
   4 cards. Cada um tem um conjunto de emojis, um título e o texto
   que aparece ao virar o card. Edite à vontade.
   ════════════════════════════════════════════════════════════ */

export type Passion = {
  emojis: string[]
  title: string
  text: string
}

export const passions: Passion[] = [
  {
    emojis: ['🎨', '🖌️', '🧶', '✂️'],
    title: 'arte & artesanato',
    text: 'de tudo que eu já criei nessa vida, te amar é a minha obra-prima 🎨',
  },
  {
    emojis: ['☕', '🍰', '🍮', '🍪'],
    title: 'chá & doces',
    text: 'um chazinho quente com algo doce e a melhor companhia do mundo.',
  },
  {
    emojis: ['💙', '❤️', '⚽'],
    title: 'Barça Femení',
    text: 'torcer junto já é bom, mas o meu gol de placa foi te encontrar 💙❤️',
  },
  {
    emojis: ['🐱', '🐶', '🐧', '🐦', '🐻'],
    title: 'bichinhos',
    text: 'nós no multiverso dos bichinhos e em todas as vidas.',
  },
]
