import { ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import { WhatsAppIcon } from '../components/icons'
import { services } from '../data/content'
import { whatsappLink } from '../lib/whatsapp'

// Tons alternados dos cards empilhados (o destaque — MCMV — usa o dourado)
const tones = {
  light: { card: 'bg-white text-royal ring-1 ring-sand', muted: 'text-royal/70', icon: 'border-royal/15 text-brown', link: 'border-royal/20 hover:bg-royal hover:text-white' },
  dark: { card: 'bg-royal text-white', muted: 'text-white/70', icon: 'border-white/20 text-gold', link: 'border-white/25 hover:bg-white hover:text-royal' },
  gold: { card: 'bg-gold text-royal', muted: 'text-royal/80', icon: 'border-royal/25 text-royal', link: 'border-royal/30 hover:bg-royal hover:text-gold' },
}

function ServiceCard({ service, index }) {
  const { icon: Icon, title, text, actions, featured } = service
  const tone = tones[featured ? 'gold' : index % 2 === 0 ? 'light' : 'dark']

  return (
    <article
      className={`relative flex min-h-[19rem] flex-col overflow-hidden rounded-[var(--radius-card)] p-7 shadow-[0_-20px_50px_-30px_rgba(15,33,26,0.35)] sm:p-9 ${tone.card}`}
    >
      <Icon className="pointer-events-none absolute -right-6 -bottom-6 size-48 opacity-[0.07]" strokeWidth={1} aria-hidden="true" />
      <div className="flex items-center justify-between">
        <span className={`inline-flex size-12 items-center justify-center rounded-full border ${tone.icon}`}>
          <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className={`font-sans text-xs tracking-[0.2em] ${tone.muted}`}>
          {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
        </span>
      </div>
      {featured && (
        <p className="mt-6 text-[0.7rem] font-medium tracking-[0.18em] uppercase">Para quem sonha com a casa própria</p>
      )}
      <h3 className={`text-[1.75rem] leading-tight sm:text-[2.1rem] ${featured ? 'mt-2' : 'mt-8'}`}>{title}</h3>
      <p className={`mt-3 max-w-lg text-[0.95rem] ${tone.muted}`}>{text}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-7">
        {actions.map((action) => (
          <li key={action.label}>
            <a
              href={whatsappLink(action.message)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${tone.link}`}
            >
              {action.label}
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/link:rotate-45" aria-hidden="true" />
              <span className="sr-only"> — {title}, pelo WhatsApp (abre em nova aba)</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="surface-light frame bg-cream">
      <div className="container-site section-y grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p data-animate="fade" className="eyebrow text-brown">
              Como podemos ajudar
            </p>
            <h2 id="servicos-title" data-animate="fade" className="heading-lg mt-6 text-royal">
              A gente acompanha você em cada etapa.
            </h2>
            <p data-animate="fade" className="mt-6 text-[0.98rem] text-royal/75">
              Comprar, vender ou alugar um imóvel pode parecer complicado quando surgem dúvidas sobre documentação,
              financiamento e negociação. Nosso papel é tornar esse caminho mais claro, com atendimento próximo e
              orientação de acordo com as necessidades de cada cliente.
            </p>
            <div data-animate="fade" className="mt-8">
              <Button href={whatsappLink('geral')} external variant="dark" leadingIcon={WhatsAppIcon}>
                Vamos conversar sobre o seu objetivo?
              </Button>
            </div>
          </div>
        </div>

        {/* Cards empilhados: cada um "gruda" um pouco abaixo do anterior */}
        <ol className="space-y-6 lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          {services.map((service, index) => (
            <li key={service.id} className="sticky" style={{ top: `calc(6.5rem + ${index} * 1.1rem)` }}>
              <ServiceCard service={service} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
