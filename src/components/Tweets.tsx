import { motion } from 'framer-motion'
import Section from './Section'
import Carousel from './Carousel'
import { tweets, type Tweet } from '../data/tweets'

function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <figure className="break-inside-avoid rounded-2xl bg-cream p-2 shadow-sm ring-1 ring-rose/20">
      <img src={tweet.src} alt={tweet.caption ?? 'tweet'} loading="lazy" className="w-full rounded-xl" />
      {tweet.caption && (
        <figcaption className="px-2 py-2 text-center font-hand text-xl text-rosedeep">
          {tweet.caption}
        </figcaption>
      )}
    </figure>
  )
}

// card de altura fixa, com o tweet centralizado (pro carrossel do celular)
function TweetCardUniform({ tweet }: { tweet: Tweet }) {
  return (
    <figure className="flex h-[440px] flex-col items-center justify-center rounded-2xl bg-cream p-3 shadow-sm ring-1 ring-rose/20">
      <img
        src={tweet.src}
        alt={tweet.caption ?? 'tweet'}
        loading="lazy"
        className="max-h-[360px] max-w-full rounded-xl object-contain"
      />
      {tweet.caption && (
        <figcaption className="pt-3 text-center font-hand text-lg text-rosedeep">
          {tweet.caption}
        </figcaption>
      )}
    </figure>
  )
}

export default function Tweets() {
  return (
    <Section id="tweets" title="o mural" subtitle="prints que são literalmente a gente">
      {/* celular: carrossel (cards do mesmo tamanho, tweet centralizado) */}
      <div className="sm:hidden">
        <Carousel slides={tweets.map((t) => <TweetCardUniform key={t.src} tweet={t} />)} />
      </div>

      {/* desktop: mosaico */}
      <div className="hidden gap-4 sm:block sm:columns-2 [&>*]:mb-4">
        {tweets.map((tweet, i) => (
          <motion.div
            key={tweet.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            whileHover={{ rotate: i % 2 ? 1 : -1, scale: 1.02 }}
            className="break-inside-avoid"
          >
            <TweetCard tweet={tweet} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
