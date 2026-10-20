import { useLayoutEffect, useRef } from 'react'
import LoopVideo from '../components/LoopVideo'
import ResponsiveImage from '../components/ResponsiveImage'
import { FULL_MOTION, gsap } from '../lib/gsap'

const TITLE = 'O caminho para transformar sonhos em endereços'

// Quebras de linha controladas (índice da palavra após a qual quebra)
const BREAKS_MOBILE = [2, 3, 5] // O caminho para / transformar / sonhos em / endereços
const BREAKS_DESKTOP = [3] // O caminho para transformar / sonhos em endereços

/** Palavras mascaradas para a revelação; o texto completo fica num único nó para leitores de tela. */
function Words({ text }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
            {BREAKS_MOBILE.includes(i) && <br className="lg:hidden short:hidden" />}
            {BREAKS_DESKTOP.includes(i) && <br className="hidden lg:inline short:inline" />}
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </>
  )
}

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(FULL_MOTION, () => {
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(q('[data-hero="card"]'), { scale: 0.96, borderRadius: 48, duration: 1.6 })
        .from(q('[data-hero="bg"]'), { autoAlpha: 0, duration: 1.4 }, 0)
        .from(q('[data-word]'), { yPercent: 110, duration: 1.4, stagger: 0.07 }, 0.35)
        .from(q('[data-hero="panel"]'), { yPercent: 35, autoAlpha: 0, duration: 1.6 }, 0.7)
        .from(q('[data-hero="panel"] img'), { scale: 1.25, duration: 2.2 }, 0.7)

      // Ao rolar: a headline sobe mais rápido que a foto, criando profundidade
      const scroll = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('[data-hero="title"]'), { yPercent: -40, ease: 'none', scrollTrigger: scroll })
      gsap.to(q('[data-hero="panel"] img'), { yPercent: 10, ease: 'none', scrollTrigger: scroll })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="inicio" ref={root} aria-labelledby="hero-title" className="pt-2.5 sm:pt-4">
      <div
        data-hero="card"
        className="frame grain relative isolate flex min-h-[calc(100svh-1.25rem)] flex-col overflow-hidden bg-royal text-white sm:min-h-[calc(100svh-2rem)]"
      >
        <div data-hero="bg" className="absolute inset-0 -z-10">
          <LoopVideo eager className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-royal/55 via-royal/20 to-royal/60" />
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pt-28 pb-10 sm:px-8 lg:pt-32 short:pt-20 short:pb-5">
          <h1
            id="hero-title"
            data-hero="title"
            className="text-center font-display text-[clamp(2.05rem,0.9rem+6vw,4rem)] lg:text-[min(6.4vw,7.5rem)] short:text-[clamp(2rem,5.4vw,3rem)] leading-[1.02] tracking-[-0.015em] text-white"
          >
            <Words text={TITLE} />
          </h1>
        </div>

        <figure
          data-hero="panel"
          className="relative mx-auto w-[calc(100%-2.5rem)] overflow-hidden rounded-t-[min(12rem,30vw)] bg-royal-800 lg:w-[min(64%,980px)] short:w-[min(66%,720px)]"
        >
          <ResponsiveImage
            name="hero-casa"
            widths={[800, 1280, 1920]}
            sizes="(min-width: 1024px) 64vw, 100vw"
            alt="Casa contemporânea com fachada iluminada ao entardecer, cercada por jardim e árvores"
            width="1280"
            height="853"
            priority
            className="block"
            imgClassName="aspect-[4/3] w-full scale-110 object-cover sm:aspect-[16/9] lg:aspect-[16/7] short:aspect-[3/1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal/50 via-transparent to-transparent" aria-hidden="true" />
        </figure>
      </div>
    </section>
  )
}
