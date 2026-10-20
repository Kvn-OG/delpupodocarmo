import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import Button from '../components/Button'
import ResponsiveImage from '../components/ResponsiveImage'
import SplitWords from '../components/SplitWords'
import { WhatsAppIcon } from '../components/icons'
import { whatsappLink } from '../lib/whatsapp'
import { FULL_MOTION, gsap, prefersReducedMotion } from '../lib/gsap'

const TITLE = 'O seu próximo capítulo começa com a conquista do seu imóvel.'

export default function Hero() {
  const root = useRef(null)
  const [playVideo, setPlayVideo] = useState(false)

  // O vídeo de fundo (loop de marca, ~190 KB) só toca sem preferência por movimento reduzido.
  useEffect(() => {
    setPlayVideo(!prefersReducedMotion())
  }, [])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(FULL_MOTION, () => {
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(q('[data-hero="bg"]'), { autoAlpha: 0, scale: 1.06, duration: 1.8 })
        .from(q('[data-hero="eyebrow"]'), { autoAlpha: 0, y: 16, duration: 1 }, 0.25)
        .from(q('[data-word]'), { yPercent: 110, duration: 1.2, stagger: 0.045 }, 0.35)
        .from(q('[data-hero="text"]'), { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.12 }, 0.8)
        .from(q('[data-hero="cta"] > *'), { autoAlpha: 0, y: 18, duration: 1, stagger: 0.1 }, 1)
        .fromTo(
          q('[data-hero="photo"]'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', clearProps: 'clipPath' },
          0.3,
        )
        .from(q('[data-hero="photo"] img'), { scale: 1.18, duration: 2.2 }, 0.3)
        .from(q('[data-hero="ornament"]'), { autoAlpha: 0, scale: 0.85, rotate: -8, duration: 1.6 }, 1.1)
        .from(q('[data-hero="note"]'), { autoAlpha: 0, x: -12, duration: 1 }, 1.3)

      // Movimento discreto ao rolar para fora do hero
      gsap.to(q('[data-hero="photo-inner"]'), {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      id="inicio"
      ref={root}
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-royal text-white"
    >
      {/* Fundo animado: loop de marca (assets/fundo_verde_loop.mp4).
          Com movimento reduzido, exibe o primeiro frame como imagem estática. */}
      <div data-hero="bg" className="absolute inset-0 -z-10" aria-hidden="true">
        {playVideo ? (
          <video
            className="size-full object-cover"
            poster="/media/hero-loop-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
          >
            <source src="/media/hero-loop-1920.mp4" type="video/mp4" media="(min-width: 1024px)" />
            <source src="/media/hero-loop.mp4" type="video/mp4" />
          </video>
        ) : (
          <img src="/media/hero-loop-poster.webp" alt="" className="size-full object-cover" />
        )}
        {/* Véus em Royalty Green apenas onde há texto, preservando a animação visível */}
        <div className="absolute inset-0 bg-royal/40 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-royal/90 via-royal/55 to-royal/10 lg:block" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-royal/60 to-transparent" />
      </div>

      <div className="container-site grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-36 lg:pb-24">
        <div className="lg:col-span-7 xl:col-span-6">
          <p data-hero="eyebrow" className="eyebrow text-gold">
            Imobiliária Delpupo do Carmo
          </p>

          <h1 id="hero-title" className="heading-xl mt-7 max-w-[15ch] text-white">
            <SplitWords text={TITLE} />
          </h1>

          <div className="mt-8 max-w-xl space-y-4 text-white/80">
            <p data-hero="text" className="text-lead">
              Comprar a casa própria, encontrar um novo lar para a família ou investir no futuro são conquistas que
              merecem ser vividas com tranquilidade e segurança.
            </p>
            <p data-hero="text" className="text-lead">
              Na Delpupo do Carmo, você encontra atendimento próximo, orientação em cada etapa e oportunidades para
              diferentes momentos da sua vida.
            </p>
          </div>

          <div data-hero="cta" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={whatsappLink('compra')} external>
              Quero encontrar meu imóvel
            </Button>
            <Button href={whatsappLink('geral')} external variant="outlineLight" icon={WhatsAppIcon} iconPosition="start">
              Fale com uma corretora
            </Button>
          </div>

          <p data-hero="note" className="mt-10 flex items-center gap-3 text-sm text-white/65">
            <span className="h-px w-10 bg-gold/70" aria-hidden="true" />
            Compra, venda e locação de imóveis em Cariacica e na Grande Vitória.
          </p>
        </div>

        <div className="relative lg:col-span-5 xl:col-span-5 xl:col-start-8">
          <svg
            data-hero="ornament"
            viewBox="0 0 200 200"
            className="pointer-events-none absolute -top-10 -left-10 hidden size-40 text-gold/50 lg:block"
            aria-hidden="true"
          >
            <path d="M0 200 A200 200 0 0 1 200 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <path d="M30 200 A170 170 0 0 1 200 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>

          <figure data-hero="photo" className="arch-tl relative overflow-hidden rounded-tr-md rounded-b-md bg-royal-800">
            <div data-hero="photo-inner" className="aspect-[4/3] scale-[1.12] sm:aspect-[16/11] lg:aspect-[4/5]">
              <ResponsiveImage
                name="hero-casa"
                widths={[800, 1280, 1920]}
                sizes="(min-width: 1024px) 45vw, 100vw"
                alt="Casa contemporânea com fachada iluminada ao entardecer, cercada por jardim e árvores"
                width="1280"
                height="853"
                priority
                imgClassName="size-full object-cover"
                className="block size-full"
              />
            </div>
            <figcaption className="absolute right-3 bottom-3 rounded-sm bg-royal/70 px-2 py-1 text-[0.68rem] tracking-wide text-white/80 backdrop-blur-sm">
              Imagem ilustrativa
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
