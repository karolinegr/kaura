import { useEffect, useState } from 'react'

type Props = {
  phrases: string[]
  className?: string
  typingSpeed?: number
  pause?: number
}

/** Efeito "máquina de escrever" que digita e apaga frases em loop. */
export default function Typewriter({
  phrases,
  className = '',
  typingSpeed = 65,
  pause = 1800,
}: Props) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (phrases.length === 0) return
    const current = phrases[index % phrases.length]

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? typingSpeed / 2 : typingSpeed,
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, phrases, typingSpeed, pause])

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle">
        &nbsp;
      </span>
    </span>
  )
}
