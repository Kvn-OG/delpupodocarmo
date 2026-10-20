import { BedDouble, MapPin, Ruler } from 'lucide-react'
import Button from './Button'
import { WhatsAppIcon } from './icons'
import { whatsappLink } from '../lib/whatsapp'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export default function PropertyCard({ property }) {
  const { title, type, purpose, location, price, priceSuffix, area, bedrooms, features = [], image, imageAlt } = property
  const message = `Olá! Tenho interesse no imóvel "${title}" (${location}) que vi no site da Delpupo do Carmo. Poderia me passar mais informações?`

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.25rem] border border-sand bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(21,43,35,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <img
          src={image}
          alt={imageAlt || title}
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-(--ease-brand) group-hover:scale-[1.04]"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {[type, purpose].filter(Boolean).map((tag) => (
            <span key={tag} className="rounded-full bg-royal/90 px-3 py-1 text-xs font-medium tracking-wide text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.4rem] leading-snug text-royal">{title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-royal/70">
          <MapPin className="size-4 text-brown" aria-hidden="true" />
          {location}
        </p>

        {(area || bedrooms) && (
          <ul className="mt-5 flex gap-6 border-t border-sand pt-5 text-sm text-royal/80">
            {area && (
              <li className="flex items-center gap-2">
                <Ruler className="size-4 text-brown" aria-hidden="true" />
                {area} m²
              </li>
            )}
            {bedrooms && (
              <li className="flex items-center gap-2">
                <BedDouble className="size-4 text-brown" aria-hidden="true" />
                {bedrooms} {bedrooms === 1 ? 'quarto' : 'quartos'}
              </li>
            )}
          </ul>
        )}

        {features.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Características">
            {features.map((feature) => (
              <li key={feature} className="rounded-full bg-cream px-3 py-1 text-xs text-royal/80">
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="font-display text-2xl text-royal">
            {typeof price === 'number' ? (
              <>
                {currency.format(price)}
                {priceSuffix && <span className="font-sans text-sm text-royal/70">{priceSuffix}</span>}
              </>
            ) : (
              <span className="text-lg">Sob consulta</span>
            )}
          </p>
          <Button href={whatsappLink(message)} external variant="dark" icon={WhatsAppIcon} className="min-h-11 px-4 text-sm">
            Consultar
          </Button>
        </div>
      </div>
    </article>
  )
}
