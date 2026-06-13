import { motion } from 'framer-motion'
import Section from './Section'
import Carousel from './Carousel'
import { songs, type Song } from '../data/songs'

const accents: Record<Song['accent'], { bar: string; text: string; chip: string }> = {
  blue: { bar: 'bg-blue', text: 'text-bluedeep', chip: 'bg-blue/10 text-bluedeep' },
  tulip: { bar: 'bg-tulip', text: 'text-tulip', chip: 'bg-tulip/10 text-tulip' },
  moss: { bar: 'bg-moss', text: 'text-forest', chip: 'bg-moss/10 text-forest' },
  gold: { bar: 'bg-gold', text: 'text-gold', chip: 'bg-gold/10 text-gold' },
}

function SongCard({ song }: { song: Song }) {
  const a = accents[song.accent]
  return (
    <article className="relative flex h-full gap-4 overflow-hidden rounded-2xl border border-sage/30 bg-cream/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <span className={`absolute inset-y-0 left-0 w-1.5 ${a.bar}`} />
      <div className="text-3xl sm:text-4xl">{song.emoji}</div>
      <div className="min-w-0">
        <h3 className="font-serif text-xl text-wine sm:text-2xl">{song.title}</h3>
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${a.chip}`}>
          {song.artist}
        </span>
        <div className="mt-3 space-y-0.5 font-hand text-xl leading-tight text-plum/90 sm:text-2xl">
          {song.lines.map((line, j) => (
            <p key={j}>{line}</p>
          ))}
        </div>
        <p className={`mt-3 text-sm ${a.text}`}>{song.note}</p>
      </div>
    </article>
  )
}

export default function Songs() {
  return (
    <Section
      id="musicas"
      title="a trilha sonora de nós"
      subtitle="as músicas que contam a nossa história"
      className="bg-gradient-to-b from-sand to-blush/50"
    >
      {/* celular: carrossel */}
      <div className="sm:hidden">
        <Carousel slides={songs.map((s) => <SongCard key={`${s.title}-${s.artist}`} song={s} />)} />
      </div>

      {/* desktop: grade */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-2">
        {songs.map((song, i) => (
          <motion.div
            key={`${song.title}-${song.artist}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
          >
            <SongCard song={song} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
