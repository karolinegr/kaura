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

export const ROWS = 14
export const COLS = 10

export const WORDS: Entry[] = [
  { dir: 'down', row: 0, col: 1, answer: 'GATOS', clue: 'Nossos filhinhos 🐱' },
  { dir: 'down', row: 0, col: 4, answer: 'GUIJARRAZO', clue: 'gol lindíssimo ⚽' },
  { dir: 'down', row: 1, col: 6, answer: 'MADRIDISTA', clue: "Thank God I'm not…" },
  { dir: 'across', row: 2, col: 1, answer: 'TULIPA', clue: 'A flor favorita da Laura 🌷' },
  { dir: 'down', row: 2, col: 9, answer: 'BROWNIE', clue: 'como tudo começou' },
  { dir: 'across', row: 4, col: 3, answer: 'LAURA', clue: 'O amor da minha vida 💚' },
  { dir: 'down', row: 6, col: 0, answer: 'AGNES', clue: 'cupido 💘' },
  { dir: 'across', row: 7, col: 0, answer: 'GRANA', clue: 'blau' },
  { dir: 'down', row: 7, col: 2, answer: 'ALEXIA', clue: 'la Reina 👑' },
  { dir: 'across', row: 8, col: 6, answer: 'SETE', clue: 'número da sorte' },
  { dir: 'across', row: 10, col: 5, answer: 'KAURA', clue: 'O nome do nosso ship 💞' },
  { dir: 'down', row: 10, col: 5, answer: 'KIKA', clue: 'gente boníssima' },
  { dir: 'down', row: 10, col: 9, answer: 'AZUL', clue: 'A cor da Karol 💙' },
  { dir: 'across', row: 12, col: 0, answer: 'HAAS', clue: 'loiry' },
]
