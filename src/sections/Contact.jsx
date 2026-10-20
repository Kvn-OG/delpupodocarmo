import { BadgeCheck, Mail, MapPin } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { InstagramIcon, WhatsAppIcon } from '../components/icons'
import { site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'

const contactItems = [
  {
    icon: MapPin,
    label: 'Endereço',
    content: (
      <>
        {site.address.street}
        <br />
        {site.address.district}
      </>
    ),
    href: site.address.mapsUrl,
    action: 'Ver no mapa',
    external: true,
  },
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    content: site.phoneDisplay,
    href: whatsappLink('geral'),
    action: 'Iniciar conversa',
    external: true,
  },
  { icon: Mail, label: 'E-mail', content: site.email, href: `mailto:${site.email}`, action: 'Enviar e-mail' },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    content: site.instagram.handle,
    href: site.instagram.url,
    action: 'Ver perfil',
    external: true,
  },
  { icon: BadgeCheck, label: 'CRECI', content: site.creci },
]

export default function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="surface-light section-y bg-cream">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p data-animate="fade" className="eyebrow text-brown">
            Contato
          </p>
          <h2 id="contato-title" data-animate="fade" className="heading-lg mt-6 text-royal">
            Vamos conversar sobre a sua próxima conquista?
          </h2>
          <p data-animate="fade" className="text-lead mt-6 text-royal/75">
            Estamos prontas para ouvir você, entender o que procura e ajudar a encontrar oportunidades imobiliárias na
            região da Grande Vitória.
          </p>

          <ul data-animate="stagger" className="mt-12 border-t border-royal/10">
            {contactItems.map(({ icon: Icon, label, content, href, action, external }) => (
              <li key={label} className="flex gap-5 border-b border-royal/10 py-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-royal text-gold">
                  <Icon className="size-[1.1rem]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-sans text-xs font-medium tracking-[0.2em] text-brown uppercase">{label}</h3>
                  <p className="mt-1 break-words text-royal">{content}</p>
                  {href && (
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="mt-1 inline-block text-sm font-medium text-royal/70 underline underline-offset-4 transition-colors hover:text-brown"
                    >
                      {action}
                      <span className="sr-only">
                        {' '}
                        — {label}
                        {external ? ' (abre em nova aba)' : ''}
                      </span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 xl:col-span-6 xl:col-start-7">
          <div data-animate="fade" className="rounded-md bg-white p-6 shadow-[0_30px_80px_-40px_rgba(21,43,35,0.35)] sm:p-10">
            <h3 className="font-display text-[1.6rem] leading-tight text-royal sm:text-3xl">Receba atendimento</h3>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
