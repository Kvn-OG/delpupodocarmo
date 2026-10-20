import { useLayoutEffect, useRef } from 'react'
import Button from '../components/Button'
import LoopVideo from '../components/LoopVideo'
import ResponsiveImage from '../components/ResponsiveImage'
import { site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'
import { FULL_MOTION, gsap } from '../lib/gsap'

const TITLE = 'O caminho para transformar sonhos em endereços'

function Letters({ text }) {
  return text.split('').map((char, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <span data-char className="inline-block">
        {char === ' ' ? ' ' : char}
      </span>
    </span>
  ))
}

function StatCard({ value, label, className = '' }) {
  return (
    <div data-hero="stat" className={`glass w-40 rounded-2xl p-4 text-white sm:w-44 ${className}`}>
      <p className="font-display text-[1.9rem] leading-none">{value}</p>
      <p className="mt-2 text-[0.72rem] leading-snug text-white/80">{label}</p>
    </div>
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
        .from(q('[data-hero="intro"] > *'), { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.08 }, 0.3)
        .from(q('[data-char]'), { yPercent: 105, duration: 1.4, stagger: 0.035 }, 0.35)
        .from(q('[data-hero="panel"]'), { yPercent: 40, autoAlpha: 0, duration: 1.6 }, 0.6)
        .from(q('[data-hero="panel"] img'), { scale: 1.25, duration: 2.2 }, 0.6)
        .from(q('[data-hero="stat"]'), { autoAlpha: 0, y: 30, scale: 0.92, duration: 1.1, stagger: 0.12 }, 1.2)
        .from(q('[data-hero="cta"]'), { autoAlpha: 0, y: 20, duration: 1 }, 1.35)
        .from(q('[data-hero="corner"]'), { autoAlpha: 0, duration: 1 }, 1.4)

      // Ao rolar: a palavra sobe mais rápido que a foto, criando profundidade
      const scroll = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('[data-hero="wordmark"]'), { yPercent: -45, ease: 'none', scrollTrigger: scroll })
      gsap.to(q('[data-hero="panel"] img'), { yPercent: 10, ease: 'none', scrollTrigger: scroll })
      gsap.to(q('[data-hero="stat"]'), { y: (i) => -60 - i * 40, ease: 'none', scrollTrigger: scroll })
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

        {/* Linha superior: título e apoio */}
        <div data-hero="intro" className="grid gap-6 px-5 pt-28 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-36">
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="eyebrow text-gold">{site.name}</p>
            <h1
              id="hero-title"
              className="mt-5 max-w-[22ch] font-sans text-[clamp(1.55rem,1.1rem+1.6vw,2.4rem)] leading-[1.12] font-light tracking-[-0.01em] uppercase"
            >
              {TITLE}
            </h1>
          </div>
          <div className="space-y-3 text-[0.92rem] leading-relaxed text-white/80 lg:col-span-4 lg:col-start-8 xl:col-start-9">
            <p>
              Comprar a casa própria, encontrar um novo lar para a família ou investir no futuro são conquistas que
              merecem ser vividas com tranquilidade e segurança.
            </p>
            <p>
              Na Delpupo do Carmo, você encontra atendimento próximo, orientação em cada etapa e oportunidades para
              diferentes momentos da sua vida.
            </p>
          </div>
        </div>

        {/* Palavra gigante + painel da casa por cima da parte inferior das letras */}
        <div className="relative mt-auto flex flex-col items-center pt-10 lg:pt-6">
          <p
            data-hero="wordmark"
            aria-hidden="true"
            className="wordmark relative z-0 text-center text-[min(16vw,8rem)] text-white/95 lg:text-[min(9.1vw,12.5rem)]"
          >
            <span className="block lg:inline">
              <Letters text="Delpupo" />
            </span>
            <span className="hidden lg:inline">{' '}</span>
            <span className="block lg:inline">
              <Letters text="do Carmo" />
            </span>
          </p>

          <div className="relative z-10 -mt-[2vw] w-[calc(100%-2.5rem)] sm:-mt-[6vw] lg:-mt-[4.2vw] lg:w-[min(64%,980px)]">
            <figure
              data-hero="panel"
              className="relative overflow-hidden rounded-t-[min(12rem,30vw)] rounded-b-[1.25rem] bg-royal-800 sm:rounded-b-none"
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
                imgClassName="aspect-[4/3] w-full scale-110 object-cover sm:aspect-[16/9] lg:aspect-[16/8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal/60 via-transparent to-transparent" aria-hidden="true" />
              <figcaption className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-royal/50 px-3 py-1 text-[0.68rem] tracking-wide text-white/85 backdrop-blur-sm">
                Imagem ilustrativa
              </figcaption>

              <div data-hero="cta" className="absolute inset-x-0 bottom-5 flex justify-center px-4 sm:bottom-7">
                <Button href={whatsappLink('compra')} external variant="light" className="shadow-xl shadow-royal/30">
                  Quero encontrar meu imóvel
                </Button>
              </div>
            </figure>

            {/* Dados reais em cards de vidro */}
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              <StatCard value="+10 anos" label="de experiência das fundadoras no mercado imobiliário" className="absolute top-[18%] -right-8 lg:-right-20" />
              <StatCard value="2025" label="Fundação da Delpupo do Carmo, em Cariacica – ES" className="absolute top-[52%] -left-8 lg:-left-24" />
            </div>
          </div>

          <p data-hero="corner" className="absolute bottom-6 left-8 hidden max-w-[12rem] text-[0.72rem] leading-snug text-white/70 lg:block">
            Compra, venda e locação de imóveis em Cariacica e na Grande Vitória.
          </p>
          <p data-hero="corner" className="absolute right-8 bottom-6 hidden text-right text-[0.72rem] leading-snug text-white/70 lg:block">
            <span className="font-slogan text-gold">{site.slogan}</span>
            <br />
            CRECI {site.creci}
          </p>
        </div>
      </div>

      {/* Dados no mobile, abaixo do card */}
      <dl className="frame mt-2.5 grid grid-cols-3 gap-2 sm:hidden">
        {[
          ['+10 anos', 'de experiência'],
          ['2025', 'fundação'],
          [site.creci, 'CRECI'],
        ].map(([value, label]) => (
          <div key={label} className="flex flex-col rounded-2xl bg-cream px-3 py-3 text-center">
            <dt className="text-[0.68rem] text-royal/65">{label}</dt>
            <dd className="order-first font-display text-[1.05rem] text-royal">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
