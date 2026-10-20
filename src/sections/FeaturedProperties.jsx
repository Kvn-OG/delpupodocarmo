import Button from '../components/Button'
import CategoryCarousel from '../components/CategoryCarousel'
import PropertyCard from '../components/PropertyCard'
import { WhatsAppIcon } from '../components/icons'
import { propertyCategories } from '../data/content'
import { properties } from '../data/properties'
import { whatsappLink } from '../lib/whatsapp'

function EmptyShowcase() {
  return (
    <div className="grain relative overflow-hidden rounded-[var(--radius-card)] bg-royal px-6 py-14 text-center text-white sm:px-12 sm:py-16">
      <svg viewBox="0 0 400 400" className="pointer-events-none absolute -right-24 -bottom-24 size-80 text-gold/25" aria-hidden="true">
        <circle cx="200" cy="200" r="199" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <img src="/favicon.svg" alt="" width="26" height="55" className="mx-auto h-12 w-auto" aria-hidden="true" />
      <h3 className="mx-auto mt-7 max-w-2xl text-[1.75rem] leading-tight sm:text-4xl">
        Estamos aqui para ajudar você a encontrar o imóvel certo.
      </h3>
      <p className="mx-auto mt-4 max-w-xl text-white/75">
        Conte para nossa equipe o que procura e conheça as oportunidades disponíveis.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href={whatsappLink('compra')} external variant="gold" leadingIcon={WhatsAppIcon}>
          Consultar imóveis pelo WhatsApp
        </Button>
      </div>
    </div>
  )
}

export default function FeaturedProperties() {
  const hasProperties = properties.length > 0

  return (
    <section id="imoveis" aria-labelledby="imoveis-title" className="surface-light section-y overflow-hidden bg-white">
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p data-animate="fade" className="eyebrow text-brown">
            Encontre seu imóvel
          </p>
          <h2 id="imoveis-title" data-animate="fade" className="heading-lg mt-6 max-w-[16ch] text-royal">
            Tem um sonho? Vamos encontrar um caminho para realizá-lo.
          </h2>
        </div>
        <p data-animate="fade" className="text-[0.98rem] text-royal/70 lg:col-span-4 lg:col-start-9 lg:pb-2">
          Cada pessoa tem seus próprios planos, necessidades e possibilidades. Por isso, trabalhamos com oportunidades
          para diferentes objetivos, ajudando você a encontrar um imóvel que faça sentido para o seu momento.
        </p>
      </div>

      <div data-animate="fade" className="mt-12 lg:mt-16">
        <CategoryCarousel items={propertyCategories} />
      </div>

      <div className="container-site">
        <div className="mt-16 flex flex-col gap-6 rounded-[var(--radius-card)] bg-cream p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <p data-animate="fade" className="max-w-xl text-royal/80">
            <strong className="font-medium text-royal">Está procurando algo específico?</strong> Conte para nossa
            equipe o que você precisa. Vamos ajudar você a conhecer as oportunidades disponíveis.
          </p>
          <div data-animate="fade" className="flex flex-col gap-3 sm:flex-row">
            <Button href="#vitrine" variant="dark">
              Consultar imóveis disponíveis
            </Button>
            <Button href={whatsappLink('compra')} external variant="outlineDark" leadingIcon={WhatsAppIcon} icon={null}>
              Encontrar um imóvel pelo WhatsApp
            </Button>
          </div>
        </div>

        <div id="vitrine" className="mt-16">
          <h3 data-animate="fade" className="eyebrow text-brown">
            {hasProperties ? 'Oportunidades disponíveis' : 'Vitrine de imóveis'}
          </h3>
          <div className="mt-6">
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
