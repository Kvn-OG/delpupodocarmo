import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'
import { whatsappLink, whatsappMessages } from '../lib/whatsapp'
import { prefersReducedMotion } from '../lib/gsap'

/**
 * Carrossel com o card central em foco e os laterais esmaecidos.
 * Rolagem nativa com scroll-snap (toque, trackpad e teclado), sem dependências.
 */
export default function CategoryCarousel({ items }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const cards = () => [...(trackRef.current?.children ?? [])]

  const goTo = useCallback((index, instant = false) => {
    const track = trackRef.current
    const card = track?.children[index]
    if (!card) return
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2
        let best = 0
        let bestDistance = Infinity
        cards().forEach((card, i) => {
          const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
          if (distance < bestDistance) {
            bestDistance = distance
            best = i
          }
        })
        setActive(best)
      })
    }
    // Começa com o segundo card ao centro, como na composição da referência
    goTo(Math.min(1, items.length - 1), true)
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [goTo, items.length])

  return (
    <div className="relative" role="region" aria-roledescription="carrossel" aria-label="Tipos de imóveis">
      <ul
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 [--card:80vw] sm:gap-6 sm:[--card:58vw] lg:[--card:min(44vw,640px)]"
        style={{ paddingInline: 'calc(50% - var(--card) / 2)' }}
      >
        {items.map((item, i) => {
          const isActive = i === active
          const message = `${whatsappMessages.compra} Tenho interesse em ${item.interest}.`
          return (
            <li
              key={item.id}
              aria-label={`${i + 1} de ${items.length}: ${item.title}`}
              className={`w-[var(--card)] shrink-0 snap-center transition-[opacity,transform,filter] duration-700 ease-(--ease-brand) ${
                isActive ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-45 saturate-50'
              }`}
            >
              <article className="group">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-cream">
                  <ResponsiveImage
                    name={item.image}
                    widths={[640, 1100]}
                    sizes="(min-width: 1024px) 44vw, 80vw"
                    alt={item.imageAlt}
                    width="1100"
                    height="760"
                    imgClassName="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-(--ease-brand) group-hover:scale-[1.04] lg:aspect-[16/11]"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[0.7rem] text-royal backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
                    Imagem ilustrativa
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <div>
                    <h3 className="text-[1.6rem] leading-tight text-royal">{item.title}</h3>
                    <p className="mt-2 max-w-md text-[0.92rem] text-royal/70">{item.text}</p>
                  </div>
                  <a
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={isActive ? 0 : -1}
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-royal text-gold transition-colors duration-300 hover:bg-gold hover:text-royal"
                  >
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                    <span className="sr-only">Consultar {item.title.toLowerCase()} pelo WhatsApp (abre em nova aba)</span>
                  </a>
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      <div className="container-site mt-6 flex items-center justify-between">
        <p className="font-sans text-sm text-royal/60" aria-live="polite">
          <span className="font-medium text-royal">{String(active + 1).padStart(2, '0')}</span> /{' '}
          {String(items.length).padStart(2, '0')}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className="inline-flex size-12 items-center justify-center rounded-full border border-royal/20 text-royal transition-colors hover:bg-royal hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-royal"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
            <span className="sr-only">Anterior</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(items.length - 1, active + 1))}
            disabled={active === items.length - 1}
            className="inline-flex size-12 items-center justify-center rounded-full border border-royal/20 text-royal transition-colors hover:bg-royal hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-royal"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
            <span className="sr-only">Próximo</span>
          </button>
        </div>
      </div>
    </div>
  )
}
