import { ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import PropertyCard from '../components/PropertyCard'
import ResponsiveImage from '../components/ResponsiveImage'
import SectionHeading from '../components/SectionHeading'
import { WhatsAppIcon } from '../components/icons'
import { propertyCategories } from '../data/content'
import { properties } from '../data/properties'
import { whatsappLink, whatsappMessages } from '../lib/whatsapp'

// Composição editorial: alturas alternadas para evitar uma grade uniforme
const layout = [
  'md:col-span-7 min-h-[22rem] sm:aspect-[4/3] sm:min-h-0 md:aspect-auto md:h-[30rem]',
  'md:col-span-5 min-h-[22rem] sm:aspect-[4/3] sm:min-h-0 md:aspect-auto md:h-[30rem] md:mt-16',
  'md:col-span-5 min-h-[22rem] sm:aspect-[4/3] sm:min-h-0 md:aspect-auto md:h-[26rem] md:-mt-16',
  'md:col-span-7 min-h-[22rem] sm:aspect-[4/3] sm:min-h-0 md:aspect-auto md:h-[26rem]',
]

function CategoryTile({ category, className }) {
  const message = `${whatsappMessages.compra} Tenho interesse em ${category.interest}.`
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-md bg-royal ${className}`}
    >
      <div data-animate="image" className="absolute inset-0">
        <ResponsiveImage
          name={category.image}
          widths={[640, 1100]}
          sizes="(min-width: 768px) 55vw, 100vw"
          alt={category.imageAlt}
          width="1100"
          height="800"
          className="block size-full"
          imgClassName="size-full object-cover transition-transform duration-[1.2s] ease-(--ease-brand) group-hover:scale-[1.05]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-royal via-royal/45 to-transparent" aria-hidden="true" />
      <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-md">
            <h3 className="font-display text-[1.65rem] leading-tight text-white sm:text-3xl">{category.title}</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-white/80">{category.text}</p>
          </div>
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 ease-(--ease-brand) group-hover:border-gold group-hover:bg-gold group-hover:text-royal">
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </span>
        </div>
        <span className="sr-only"> — consultar pelo WhatsApp (abre em nova aba)</span>
      </div>
      <span className="absolute top-4 right-4 rounded-sm bg-royal/60 px-2 py-0.5 text-[0.68rem] tracking-wide text-white/75 backdrop-blur-sm">
        Imagem ilustrativa
      </span>
    </a>
  )
}

function EmptyShowcase() {
  return (
    <div className="grain relative overflow-hidden rounded-md bg-royal px-6 py-14 text-center sm:px-12 sm:py-20">
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -bottom-24 size-80 text-gold/25"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="199" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <img src="/favicon.svg" alt="" width="28" height="59" className="mx-auto h-14 w-auto" aria-hidden="true" />
      <h3 className="mx-auto mt-8 max-w-2xl font-display text-[1.75rem] leading-tight text-white sm:text-4xl">
        Estamos aqui para ajudar você a encontrar o imóvel certo.
      </h3>
      <p className="mx-auto mt-5 max-w-xl text-white/75 text-lead">
        Conte para nossa equipe o que procura e conheça as oportunidades disponíveis.
      </p>
      <div className="mt-9 flex justify-center">
        <Button href={whatsappLink('compra')} external icon={WhatsAppIcon} iconPosition="start">
          Consultar imóveis pelo WhatsApp
        </Button>
      </div>
    </div>
  )
}

export default function FeaturedProperties() {
  const hasProperties = properties.length > 0

  return (
    <section id="imoveis" aria-labelledby="imoveis-title" className="surface-light section-y bg-cream">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="imoveis-title"
            eyebrow="Encontre seu imóvel"
            title="Tem um sonho? Vamos encontrar um caminho para realizá-lo."
            className="lg:col-span-7"
          />
          <div className="lg:col-span-5 lg:pb-2">
            <p data-animate="fade" className="text-lead text-royal/75">
              Cada pessoa tem seus próprios planos, necessidades e possibilidades. Por isso, trabalhamos com
              oportunidades para diferentes objetivos, ajudando você a encontrar um imóvel que faça sentido para o seu
              momento.
            </p>
          </div>
        </div>

        <div data-animate="line" className="mt-14 h-px bg-royal/15" />

        <ul className="mt-14 grid gap-5 md:grid-cols-12 md:gap-6">
          {propertyCategories.map((category, i) => (
            <li key={category.id} className={layout[i]}>
              <CategoryTile category={category} className="h-full" />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col gap-8 rounded-md border border-royal/10 bg-white/60 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <p data-animate="fade" className="max-w-xl text-royal/80">
            <strong className="font-medium text-royal">Está procurando algo específico?</strong> Conte para nossa
            equipe o que você precisa. Vamos ajudar você a conhecer as oportunidades disponíveis.
          </p>
          <div data-animate="fade" className="flex flex-col gap-3 sm:flex-row">
            <Button href="#vitrine" variant="dark">
              Consultar imóveis disponíveis
            </Button>
            <Button href={whatsappLink('compra')} external variant="outlineDark" icon={WhatsAppIcon} iconPosition="start">
              Encontrar um imóvel pelo WhatsApp
            </Button>
          </div>
        </div>

        <div id="vitrine" className="mt-20">
          <h3 id="vitrine-title" data-animate="fade" className="eyebrow text-brown">
            {hasProperties ? 'Oportunidades disponíveis' : 'Vitrine de imóveis'}
          </h3>
          <div className="mt-8">
            {hasProperties ? (
              <ul data-animate="stagger" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {properties.map((property) => (
                  <li key={property.id} className="flex">
                    <PropertyCard property={property} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyShowcase />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
