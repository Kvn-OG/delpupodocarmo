import Logo from './Logo'
import { InstagramIcon, WhatsAppIcon } from './icons'
import { Mail, MapPin } from 'lucide-react'
import { legalLinks, navigation, site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'

export default function Footer({ onHome = true }) {
  const hrefFor = (id) => (onHome ? `#${id}` : `/#${id}`)
  const linkClass = 'transition-colors duration-300 hover:text-gold'

  return (
    <footer className="frame relative mb-2.5 overflow-hidden bg-royal-900 text-white/70 sm:mb-4">
      <div className="container-site pt-16 pb-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo variant="light" height={64} className="h-14 w-auto sm:h-16" />
            <p className="mt-7 font-sans text-lg tracking-wide text-gold">{site.slogan}</p>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed">
              Compra, venda e locação de imóveis, lançamentos imobiliários e orientação para quem deseja conquistar seu
              lugar.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé" className="lg:col-span-3">
            <h2 className="font-sans text-xs font-medium tracking-[0.22em] text-white uppercase">Navegação</h2>
            <ul className="mt-5 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={hrefFor(item.id)} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-sans text-xs font-medium tracking-[0.22em] text-white uppercase">Contato</h2>
            <ul className="mt-5 space-y-3.5">
              <li className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {site.address.street}, {site.address.district}
                  <br />
                  Atendimento em {site.region}
                </span>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-1 size-4 shrink-0 text-gold" />
                <a href={whatsappLink('geral')} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp: {site.phoneDisplay}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li className="flex gap-3">
                <InstagramIcon className="mt-1 size-4 shrink-0 text-gold" />
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram: {site.instagram.handle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  E-mail: {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {site.name}. Todos os direitos reservados. <span className="whitespace-nowrap">CRECI: {site.creci}</span>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Palavra gigante decorativa, fechando o ciclo iniciado no hero */}
      <p
        aria-hidden="true"
       
        className="wordmark -mb-[2.2vw] px-2 text-center text-[min(9.3vw,12.5rem)] text-white/[0.06]"
      >
        Delpupo do Carmo
      </p>
    </footer>
  )
}
