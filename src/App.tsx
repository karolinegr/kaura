import { useEffect } from 'react'
import Petals from './components/Petals'
import Stars from './components/Stars'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Distance from './components/Distance'
import Gallery from './components/Gallery'
import Songs from './components/Songs'
import Lifetime from './components/Lifetime'
import Letters from './components/Letters'
import Tweets from './components/Tweets'
import Passions from './components/Passions'
import Crossword from './components/Crossword'
import Tickets from './components/Tickets'
import MusicPlayer from './components/MusicPlayer'
import SafeBoundary from './components/SafeBoundary'
import { useLocalStorage } from './hooks/useLocalStorage'
import { config } from './config'

export default function App() {
  const [night, setNight] = useLocalStorage('kaura:night', false)

  useEffect(() => {
    document.documentElement.classList.toggle('night', night)
  }, [night])

  return (
    <>
      <Petals />
      {night && <Stars />}
      <Navbar night={night} onToggleTheme={() => setNight((n) => !n)} />
      <main className="relative z-10">
        <Hero />
        <Distance />
        <Gallery />
        <Songs />
        <Lifetime />
        <Letters />
        <Tweets />
        <Passions />
        <Crossword />
        <Tickets />
      </main>
      <footer className="relative z-10 bg-[#3f5233] py-10 text-center text-white/85 night:bg-[#0b1020]">
        <p className="font-hand text-3xl">feito com amor pra você, Laura ♡</p>
        <p className="mt-2 text-sm text-white/55">
          {config.shipFormula} · {config.siteTitle} · {new Date().getFullYear()}
        </p>
      </footer>
      <SafeBoundary>
        <MusicPlayer />
      </SafeBoundary>
    </>
  )
}
