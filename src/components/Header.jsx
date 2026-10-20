import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { InstagramIcon, WhatsAppIcon } from './icons'
import { navigation, site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'
import { startScroll, stopScroll } from '../lib/smoothScroll'

/**
 * No topo da página inicial, a navegação fica "dentro" do card do hero.
 * Ao rolar, vira uma barra flutuante em pílula.
 *
 * Importante: nada no <header> usa backdrop-filter, para não criar um bloco
 * de contenção que esconderia o menu mobile (position: fixed).
 */
export default function Header({ onHome = true }) {
  const [scrolled, setScrolled] = useState(!onHome)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  const restoreFocusRef = useRef(true)

  const hrefFor = (id) => (onHome ? `#${id}` : `/#${id}`)

  useEffect(() => {
    if (!onHome) return
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onHome])

  useEffect(() => {
    if (!onHome) return
    const sections = navigation.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onHome])

  // Menu mobile: trava a rolagem, fecha com Esc e mantém o foco dentro do painel
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    restoreFocusRef.current = true
    stopScroll()
    document.documentElement.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') return setOpen(false)
      if (event.key !== 'Tab') return
      const focusables = [toggle, ...panelRef.current.querySelectorAll('a')]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1280 && setOpen(false)

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      document.documentElement.style.overflow = ''
      startScroll()
      if (restoreFocusRef.current) toggle?.focus({ preventScroll: true })
    }
  }, [open])

  const closeFromLink = () => {
    restoreFocusRef.current = false
    setOpen(false)
  }

  const compact = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-royal"
      >
        Pular para o conteúdo
      </a>

      {/* Menu mobile (atrás da barra) */}
      <div id="menu-mobile" ref={panelRef} hidden={!open} className="fixed inset-0 overflow-y-auto bg-royal xl:hidden">
        <nav aria-label="Navegação principal (menu)" className="container-site flex min-h-full flex-col pt-28 pb-10">
          <ul>
            {navigation.map((item, index) => (
              <li key={item.id} className="border-b border-white/10">
                <a
                  href={hrefFor(item.id)}
                  onClick={closeFromLink}
                  aria-current={onHome && active === item.id ? 'true' : undefined}
                  className="flex items-baseline gap-5 py-5 font-display text-[1.7rem] leading-none text-white transition-colors hover:text-gold aria-[current]:text-gold"
                >
                  <span className="font-sans text-xs tracking-[0.2em] text-gold/80">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Button href={whatsappLink('geral')} external variant="gold" leadingIcon={WhatsAppIcon} className="w-full justify-between" onClick={closeFromLink}>
              Fale com a nossa equipe
            </Button>
            <div className="mt-6 flex items-center justify-between text-sm text-white/65">
              <span>CRECI {site.creci}</span>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                <InstagramIcon className="size-4" />
                {site.instagram.handle}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Barra */}
      <div
        className={`relative mx-auto transition-[max-width,margin,padding,background-color,box-shadow,border-radius] duration-700 ease-(--ease-brand) ${
          compact
            ? 'mt-2.5 max-w-[min(1180px,calc(100%-1.25rem))] rounded-full bg-royal/95 px-3 py-2 shadow-[0_18px_40px_-20px_rgba(15,33,26,0.6)] ring-1 ring-white/10 sm:mt-3 sm:pl-6'
            : 'mt-2.5 max-w-[calc(100%-1.25rem)] rounded-[var(--radius-card)] px-4 py-4 sm:mt-4 sm:max-w-[calc(100%-2rem)] sm:px-8 sm:py-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href={onHome ? '#inicio' : '/'} className="shrink-0" aria-label="Imobiliária Delpupo do Carmo — página inicial">
            <Logo variant="light" height={44} className={`w-auto transition-[height] duration-500 ${compact ? 'h-9' : 'h-10 lg:h-11'}`} />
          </a>

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-1.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    aria-current={onHome && active === item.id ? 'true' : undefined}
                    className="inline-flex rounded-full border border-white/20 px-4 py-1.5 text-[0.82rem] text-white/85 transition-colors duration-300 hover:border-white/60 hover:text-white aria-[current]:border-white aria-[current]:bg-white aria-[current]:text-royal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold lg:inline-flex"
            >
              <InstagramIcon className="size-4" />
              <span className="sr-only">Instagram (abre em nova aba)</span>
            </a>
            <a
              href={whatsappLink('geral')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full bg-white pr-4 pl-1.5 text-[0.82rem] font-medium whitespace-nowrap text-royal transition-colors hover:bg-gold md:inline-flex"
            >
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-royal text-gold">
                <WhatsAppIcon className="size-3.5" />
              </span>
              Fale com a nossa equipe
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold xl:hidden"
            >
              <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
