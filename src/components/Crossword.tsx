import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Section from './Section'
import { COLS, ROWS, WORDS, type Dir, type Entry } from '../data/crossword'

const key = (r: number, c: number) => `${r}-${c}`

type Cell = { r: number; c: number }

export default function Crossword() {
  const { solution, numbers, cellDirs, wordNum } = useMemo(() => {
    const solution = new Map<string, string>()
    const cellDirs = new Map<string, Set<Dir>>()
    for (const w of WORDS) {
      ;[...w.answer].forEach((ch, k) => {
        const r = w.dir === 'down' ? w.row + k : w.row
        const c = w.dir === 'across' ? w.col + k : w.col
        solution.set(key(r, c), ch)
        if (!cellDirs.has(key(r, c))) cellDirs.set(key(r, c), new Set())
        cellDirs.get(key(r, c))!.add(w.dir)
      })
    }
    // numeração padrão de cruzadinha (varre as células em ordem de leitura)
    const numbers = new Map<string, number>()
    let n = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!solution.has(key(r, c))) continue
        const startAcross = !solution.has(key(r, c - 1)) && solution.has(key(r, c + 1))
        const startDown = !solution.has(key(r - 1, c)) && solution.has(key(r + 1, c))
        if (startAcross || startDown) {
          n++
          numbers.set(key(r, c), n)
        }
      }
    }
    const wordNum = new Map<Entry, number>()
    for (const w of WORDS) wordNum.set(w, numbers.get(key(w.row, w.col)) ?? 0)
    return { solution, numbers, cellDirs, wordNum }
  }, [])

  const [letters, setLetters] = useState<Record<string, string>>({})
  const [active, setActive] = useState<Cell | null>(null)
  const [dir, setDir] = useState<Dir>('across')
  const [checked, setChecked] = useState(false)
  const inputs = useRef<Record<string, HTMLInputElement | null>>({})
  const solvedRef = useRef(false)

  const solved = useMemo(
    () => [...solution.entries()].every(([k, ch]) => (letters[k] || '') === ch),
    [letters, solution],
  )

  useEffect(() => {
    if (solved && !solvedRef.current) {
      solvedRef.current = true
      const shapes = ['💚', '💙', '🤎', '🌷'].map((t) => confetti.shapeFromText({ text: t, scalar: 2 }))
      confetti({ particleCount: 60, spread: 120, scalar: 2, shapes, startVelocity: 42, origin: { y: 0.5 } })
    }
    if (!solved) solvedRef.current = false
  }, [solved])

  const focusCell = (r: number, c: number) => inputs.current[key(r, c)]?.focus()

  const wordCells = (cell: Cell, d: Dir): string[] => {
    const w = WORDS.find((w) =>
      w.dir === d &&
      (d === 'across'
        ? w.row === cell.r && cell.c >= w.col && cell.c < w.col + w.answer.length
        : w.col === cell.c && cell.r >= w.row && cell.r < w.row + w.answer.length),
    )
    if (!w) return []
    return [...w.answer].map((_, k) =>
      key(d === 'down' ? w.row + k : w.row, d === 'across' ? w.col + k : w.col),
    )
  }

  const activeWord = new Set(active ? wordCells(active, dir) : [])

  const selectCell = (r: number, c: number) => {
    const dirs = cellDirs.get(key(r, c))
    if (!dirs) return
    if (active && active.r === r && active.c === c) {
      if (dirs.size > 1) setDir((d) => (d === 'across' ? 'down' : 'across'))
    } else {
      setActive({ r, c })
      setDir(dirs.has(dir) ? dir : dirs.has('across') ? 'across' : 'down')
    }
    focusCell(r, c)
  }

  const step = (r: number, c: number, d: Dir, back = false): Cell | null => {
    const delta = back ? -1 : 1
    const nr = d === 'down' ? r + delta : r
    const nc = d === 'across' ? c + delta : c
    return solution.has(key(nr, nc)) ? { r: nr, c: nc } : null
  }

  const handleChange = (r: number, c: number, val: string) => {
    const ch = val.slice(-1).toUpperCase()
    if (ch && !/[A-ZÇ]/.test(ch)) return
    setLetters((prev) => ({ ...prev, [key(r, c)]: ch }))
    setChecked(false)
    if (ch) {
      const n = step(r, c, dir)
      if (n) {
        setActive(n)
        focusCell(n.r, n.c)
      }
    }
  }

  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent) => {
    const k = key(r, c)
    if (e.key === 'Backspace' && !letters[k]) {
      const p = step(r, c, dir, true)
      if (p) {
        e.preventDefault()
        setActive(p)
        setLetters((prev) => ({ ...prev, [key(p.r, p.c)]: '' }))
        focusCell(p.r, p.c)
      }
    } else if (e.key.startsWith('Arrow')) {
      e.preventDefault()
      const map: Record<string, [number, number, Dir]> = {
        ArrowRight: [0, 1, 'across'],
        ArrowLeft: [0, -1, 'across'],
        ArrowDown: [1, 0, 'down'],
        ArrowUp: [-1, 0, 'down'],
      }
      const m = map[e.key]
      if (!m) return
      setDir(m[2])
      const nr = r + m[0]
      const nc = c + m[1]
      if (solution.has(key(nr, nc))) {
        setActive({ r: nr, c: nc })
        focusCell(nr, nc)
      }
    }
  }

  const selectClue = (w: Entry) => {
    setActive({ r: w.row, c: w.col })
    setDir(w.dir)
    focusCell(w.row, w.col)
  }

  const reset = () => {
    setLetters({})
    setChecked(false)
    setActive(null)
  }

  const byNum = (a: Entry, b: Entry) => (wordNum.get(a) ?? 0) - (wordNum.get(b) ?? 0)
  const across = WORDS.filter((w) => w.dir === 'across').sort(byNum)
  const down = WORDS.filter((w) => w.dir === 'down').sort(byNum)

  // navegação de dica (barra do celular)
  const findWord = (cell: Cell, d: Dir) =>
    WORDS.find(
      (w) =>
        w.dir === d &&
        (d === 'across'
          ? w.row === cell.r && cell.c >= w.col && cell.c < w.col + w.answer.length
          : w.col === cell.c && cell.r >= w.row && cell.r < w.row + w.answer.length),
    )
  const allClues = [...WORDS].sort(
    (a, b) =>
      (wordNum.get(a) ?? 0) - (wordNum.get(b) ?? 0) ||
      (a.dir === b.dir ? 0 : a.dir === 'across' ? -1 : 1),
  )
  const currentClue = (active && findWord(active, dir)) ?? allClues[0]
  const goRel = (delta: number) => {
    const i = allClues.indexOf(currentClue)
    const next = allClues[(i + delta + allClues.length) % allClues.length]
    if (next) selectClue(next)
  }

  return (
    <Section
      id="cruzadas"
      title="palavras cruzadas de nós"
      subtitle="Resolve essa pra mim? 🧩"
      className="bg-gradient-to-b from-sand to-blush/40"
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
        {/* grade */}
        <div className="w-full shrink-0 text-center lg:w-auto">
          <div
            className="inline-grid gap-0.5 rounded-xl bg-sage/30 p-2 text-left"
            style={{ gridTemplateColumns: `repeat(${COLS}, clamp(1.5rem, 8.2vw, 2.25rem))` }}
          >
            {Array.from({ length: ROWS * COLS }).map((_, idx) => {
              const r = Math.floor(idx / COLS)
              const c = idx % COLS
              const k = key(r, c)
              if (!solution.has(k)) return <div key={k} className="aspect-square w-full" />

              const isActive = active?.r === r && active?.c === c
              const inWord = activeWord.has(k)
              const value = letters[k] || ''
              const correct = checked && value && value === solution.get(k)
              const wrong = checked && value && value !== solution.get(k)
              const num = numbers.get(k)

              return (
                <div key={k} className="relative aspect-square w-full">
                  {num && (
                    <span className="pointer-events-none absolute left-0.5 top-0 z-10 text-[9px] font-semibold text-cocoa/60">
                      {num}
                    </span>
                  )}
                  <input
                    ref={(el) => { inputs.current[k] = el }}
                    value={value}
                    onChange={(e) => handleChange(r, c, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(r, c, e)}
                    onFocus={() => selectCell(r, c)}
                    onClick={() => selectCell(r, c)}
                    inputMode="text"
                    maxLength={1}
                    aria-label={`linha ${r + 1}, coluna ${c + 1}`}
                    className={`h-full w-full rounded-sm border text-center font-serif text-base font-semibold uppercase caret-transparent outline-none transition-colors sm:text-lg ${
                      isActive
                        ? 'border-blue bg-blue/30'
                        : inWord
                          ? 'border-sage/60 bg-blue/10'
                          : 'border-sage/40 bg-cream'
                    } ${correct ? 'text-moss' : wrong ? 'text-tulip' : 'text-forest'}`}
                  />
                </div>
              )
            })}
          </div>

          {/* barra de dica navegável (celular/tablet) */}
          <div className="mx-auto mt-4 flex max-w-md items-center gap-2 lg:hidden">
            <button
              onClick={() => goRel(-1)}
              aria-label="dica anterior"
              className="shrink-0 rounded-full border border-sage/50 px-3 py-2 text-lg leading-none text-forest active:bg-blush"
            >
              ‹
            </button>
            <button
              onClick={() => currentClue && selectClue(currentClue)}
              className="flex-1 rounded-xl bg-blush px-3 py-2 text-left text-sm text-cocoa"
            >
              <span className="mr-1 font-semibold text-moss">
                {wordNum.get(currentClue)} {currentClue.dir === 'across' ? '→' : '↓'}
              </span>
              {currentClue.clue}
            </button>
            <button
              onClick={() => goRel(1)}
              aria-label="próxima dica"
              className="shrink-0 rounded-full border border-sage/50 px-3 py-2 text-lg leading-none text-forest active:bg-blush"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setChecked(true)}
              className="rounded-full bg-mix px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
            >
              conferir
            </button>
            <button
              onClick={reset}
              className="rounded-full border border-sage/50 px-5 py-2 text-sm text-cocoa/70 hover:bg-blush"
            >
              limpar
            </button>
          </div>

          {solved && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-center font-hand text-3xl text-mix"
            >
              isso! você nos conhece de cor 💚🤎💙
            </motion.p>
          )}
        </div>

        {/* dicas (lista completa só no desktop) */}
        <div className="hidden w-full max-w-md grid-cols-2 gap-6 lg:grid lg:w-auto">
          {[
            { title: 'horizontais →', list: across },
            { title: 'verticais ↓', list: down },
          ].map((group) => (
            <div key={group.title}>
              <h3 className="mb-2 font-serif text-xl text-wine">{group.title}</h3>
              <ul className="space-y-2">
                {group.list.map((w) => (
                  <li key={`${w.dir}-${wordNum.get(w)}`}>
                    <button
                      onClick={() => selectClue(w)}
                      className="text-left text-sm text-cocoa/80 hover:text-forest"
                    >
                      <span className="font-semibold text-moss">{wordNum.get(w)}.</span> {w.clue}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
