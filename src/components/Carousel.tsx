import { useCallback, useEffect, useState, type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

/** Carrossel deslizável (toque/arrasto) com bolinhas de navegação. */
export default function Carousel({ slides }: { slides: ReactNode[] }) {
  const [ref, api] = useEmblaCarousel({ align: 'center', loop: false, containScroll: 'trimSnaps' })
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(0)

  const onSelect = useCallback(() => {
    if (api) setSelected(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
  }, [api, onSelect])

  return (
    <div>
      <div className="overflow-hidden" ref={ref}>
        <div className="flex touch-pan-y">
          {slides.map((slide, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-[86%] pl-4 first:pl-0">
              {slide}
            </div>
          ))}
        </div>
      </div>
      {count > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`ir para o item ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === selected ? 'w-5 bg-moss' : 'w-2 bg-sage/50'
              }`}
            />
          ))}
        </div>
      )}
      <p className="mt-3 text-center font-hand text-lg text-moss/70">arraste para o lado →</p>
    </div>
  )
}
