import { ArrowUpRight } from 'lucide-react'
import { whatsappLink } from '../lib/whatsapp'

/** Linha editorial de serviço (fundo escuro). `featured` ganha destaque visual. */
export default function ServiceCard({ service, index }) {
  const { icon: Icon, title, text, actions, featured } = service

  return (
    <article
      className={`group relative grid gap-5 py-9 sm:grid-cols-[4.5rem_1fr] sm:gap-8 ${
        featured ? 'rounded-md bg-royal-800 px-6 ring-1 ring-gold/25 sm:-ml-6' : ''
      }`}
    >
      <div className="flex items-center gap-4 sm:flex-col sm:items-start">
        <span className="font-sans text-xs tracking-[0.22em] text-gold/80">{String(index + 1).padStart(2, '0')}</span>
        <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-royal">
          <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>

      <div>
        {featured && (
          <p className="mb-3 inline-block rounded-sm bg-gold/15 px-2 py-0.5 text-[0.7rem] font-medium tracking-[0.16em] text-gold uppercase">
            Para quem sonha com a casa própria
          </p>
        )}
        <h3 className="font-display text-[1.6rem] leading-tight text-white sm:text-[1.85rem]">{title}</h3>
        <p className="mt-3 max-w-xl text-white/70">{text}</p>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {actions.map((action) => (
            <li key={action.label}>
              <a
                href={whatsappLink(action.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-1 text-[0.95rem] font-medium text-gold underline-offset-[6px] hover:underline"
              >
                {action.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> — {title}, pelo WhatsApp (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
