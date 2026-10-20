import { ArrowUpRight, BadgeCheck, Mail, MapPin } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { InstagramIcon, WhatsAppIcon } from '../components/icons'
import { site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'

const contactItems = [
  {
    icon: MapPin,
    label: 'Endereço',
    content: `${site.address.street} — ${site.address.district}`,
    href: site.address.mapsUrl,
    action: 'Ver no mapa',
    external: true,
    wide: true,
  },
  { icon: WhatsAppIcon, label: 'WhatsApp', content: site.phoneDisplay, href: whatsappLink('geral'), action: 'Iniciar conversa', external: true },
  { icon: InstagramIcon, label: 'Instagram', content: site.instagram.handle, href: site.instagram.url, action: 'Ver perfil', external: true },
  { icon: Mail, label: 'E-mail', content: site.email, href: `mailto:${site.email}`, action: 'Enviar e-mail' },
  { icon: BadgeCheck, label: 'CRECI', content: site.creci },
]

function ContactTile({ icon: Icon, label, content, href, action, external }) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-royal text-gold">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        {href && (
          <ArrowUpRight className="size-4 text-royal/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-royal" aria-hidden="true" />
        )}
      </div>
      <p className="mt-6 font-sans text-[0.7rem] font-medium tracking-[0.2em] text-brown uppercase">{label}</p>
      <p className="mt-1 break-words text-royal">{content}</p>
      {href && (
        <span className="sr-only">
          {' '}
          — {action}
          {external ? ' (abre em nova aba)' : ''}
        </span>
      )}
    </>
  )
  const classes = `group block rounded-[1.25rem] bg-cream p-5 transition-colors duration-300 ${href ? 'hover:bg-sand' : ''}`

  return href ? (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={classes}>
      {inner}
    </a>
  ) : (
    <div className={classes}>{inner}</div>
  )
}

export default function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="surface-light section-y bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p data-animate="fade" className="eyebrow text-brown">
            Contato
          </p>
          <h2 id="contato-title" data-animate="fade" className="heading-lg mt-6 text-royal">
            Vamos conversar sobre a sua próxima conquista?
          </h2>
          <p data-animate="fade" className="mt-6 text-[0.98rem] text-royal/75">
            Estamos prontas para ouvir você, entender o que procura e ajudar a encontrar oportunidades imobiliárias na
            região da Grande Vitória.
          </p>

          <ul data-animate="stagger" className="mt-10 grid gap-3 sm:grid-cols-2">
            {contactItems.map((item) => (
              <li key={item.label} className={item.wide ? 'sm:col-span-2' : ''}>
                <ContactTile {...item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 xl:col-span-6 xl:col-start-7">
          <div data-animate="fade" className="rounded-[var(--radius-card)] bg-cream p-6 sm:p-10">
            <h3 className="text-[1.8rem] leading-tight text-royal sm:text-[2.2rem]">Receba atendimento</h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
