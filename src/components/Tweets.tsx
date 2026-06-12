import { motion } from 'framer-motion'
import Section from './Section'
import { tweets } from '../data/tweets'

export default function Tweets() {
  return (
    <Section id="tweets" title="o mural" subtitle="prints que são literalmente a gente">
      <div className="columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
        {tweets.map((tweet, i) => (
          <motion.figure
            key={tweet.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            whileHover={{ rotate: i % 2 ? 1 : -1, scale: 1.02 }}
            className="break-inside-avoid rounded-2xl bg-cream p-2 shadow-sm ring-1 ring-rose/20"
          >
            <img
              src={tweet.src}
              alt={tweet.caption ?? 'tweet'}
              loading="lazy"
              className="w-full rounded-xl"
            />
            {tweet.caption && (
              <figcaption className="px-2 py-2 text-center font-hand text-xl text-rosedeep">
                {tweet.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </Section>
  )
}
