/* ════════════════════════════════════════════════════════════
   PALAVRAS CRUZADAS DE NÓS
   Cada palavra tem posição (row/col, começando em 0), direção e dica.
   ⚠️ As palavras se cruzam — esta grade foi gerada e verificada
   (0 conflitos). Se quiser mudar as palavras, me peça pra gerar uma
   grade nova (fazer na mão dá erro fácil nos cruzamentos).
   Sem acentos nas respostas. A numeração é calculada automaticamente.
   ════════════════════════════════════════════════════════════ */

export type Dir = 'across' | 'down'

export type Entry = {
  dir: Dir
  row: number
  col: number
  answer: string
  clue: string
}

export const ROWS = 20
export const COLS = 11

export const WORDS: Entry[] = [
  { dir: 'down', row: 0, col: 1, answer: 'PINGUIM', clue: 'A mô sempre quis uma ___zinha pra ela 🐧' },
  { dir: 'across', row: 1, col: 0, answer: 'KIKA', clue: 'Gente boníssima 👃🏻' },
  { dir: 'down', row: 2, col: 8, answer: 'GATOS', clue: 'Nossos filhinhos 🐱' },
  { dir: 'down', row: 2, col: 10, answer: 'LAURA', clue: 'O amor da vida da Karol 💚' },
  { dir: 'across', row: 3, col: 0, answer: 'AGNES', clue: 'Cupido 💘' },
  { dir: 'across', row: 3, col: 6, answer: 'GRANA', clue: 'Blau 🔵' },
  { dir: 'down', row: 4, col: 5, answer: 'GUIJARRAZO', clue: 'Um gol lindíssimo ⚽' },
  { dir: 'across', row: 6, col: 1, answer: 'MADRIDISTA', clue: "Thank God I'm not…" },
  { dir: 'down', row: 6, col: 2, answer: 'ALEXIA', clue: 'La Reina 👑' },
  { dir: 'across', row: 8, col: 1, answer: 'DEUSA', clue: 'Minha ___, mulher da minha vida ✨' },
  { dir: 'down', row: 8, col: 10, answer: 'TULIPA', clue: 'A flor favorita da Laura 🌷' },
  { dir: 'down', row: 9, col: 8, answer: 'BROWNIE', clue: 'Como tudo começou' },
  { dir: 'across', row: 11, col: 1, answer: 'KAURA', clue: 'O nome do nosso ship 💞' },
  { dir: 'across', row: 13, col: 2, answer: 'ESPOSINHA', clue: 'De risadinha em risadinha, tu vira minha ___ 😘' },
  { dir: 'down', row: 13, col: 3, answer: 'SAUDADE', clue: '765 km disso 💔' },
  { dir: 'down', row: 13, col: 6, answer: 'SAFADA', clue: 'O que uma chama a outra quando apronta 😈' },
  { dir: 'across', row: 15, col: 1, answer: 'AZUL', clue: 'A cor da Karol 💙' },
  { dir: 'across', row: 18, col: 5, answer: 'HAAS', clue: 'Loiry 🏃🏼‍♀️' },
  { dir: 'across', row: 19, col: 0, answer: 'SETE', clue: 'Número da sorte 🍀' },
]
