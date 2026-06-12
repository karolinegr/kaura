import Section from './Section'
import PhotoDeck from './PhotoDeck'
import DraggableHeart from './DraggableHeart'

export default function Gallery() {
  return (
    <Section id="galeria" title="nossas fotos" subtitle="um baralho dos nossos momentos">
      <PhotoDeck />

      {/* coração azul (você) arrastável, logo abaixo das fotos */}
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-2 h-px w-16 bg-gradient-to-r from-transparent via-blue/50 to-transparent" />
        <DraggableHeart emoji="💙" labelClass="text-blue" />
      </div>
    </Section>
  )
}
