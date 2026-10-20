import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { WhatsAppIcon, InstagramIcon } from './icons'
import { navigation, site } from '../data/site'
import { whatsappLink } from '../lib/whatsapp'
import { startScroll, stopScroll } from '../lib/smoothScroll'

export default function Header({ onHome = true }) {
  const [scrolled, setScrolled] = useState(!onHome)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  const restoreFocusRef = useRef(true)

  const hrefFor = (id) => (onHome ? `#${id}` : `/#${id}`)

  // Fundo sólido após o início da rolagem
  useEffect(() => {
    if (!onHome) return
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onHome])

  // Seção ativa na navegação
  useEffect(() => {
    if (!onHome) return
    const sections = navigation.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
      },
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
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
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

  const solid = scrolled || open

  // Ao escolher uma seção, o foco segue para ela (não volta ao botão do menu)
  const closeFromLink = () => {
    restoreFocusRef.current = false
    setOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Fundo em camada própria: backdrop-filter no <header> criaria um bloco de
          contenção para o menu mobile (position: fixed) e o esconderia. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[4.5rem] transition-[opacity,box-shadow] duration-500 ease-(--ease-brand) lg:h-20 ${
          solid ? 'bg-royal/95 opacity-100 shadow-[0_1px_0_rgba(225,189,35,0.14)] backdrop-blur-md' : 'opacity-0'
        }`}
      />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-royal"
      >
        Pular para o conteúdo
      </a>

      <div className="relative container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <a href={onHome ? '#inicio' : '/'} className="shrink-0" aria-label="Imobiliária Delpupo do Carmo — página inicial">
          <Logo variant="light" height={44} className="h-10 w-auto lg:h-11" />
        </a>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={hrefFor(item.id)}
                  aria-current={onHome && active === item.id ? 'true' : undefined}
                  className="group relative py-2 text-[0.92rem] text-white/80 transition-colors duration-300 hover:text-white aria-[current]:text-white"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-(--ease-brand) group-hover:scale-x-100 group-aria-[current]:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button
              href={whatsappLink('geral')}
              external
              variant={solid ? 'gold' : 'outlineLight'}
              icon={WhatsAppIcon}
              iconPosition="start"
              className="min-h-11 px-5 text-[0.88rem] whitespace-nowrap"
            >
              Fale com uma corretora
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="relative z-10 inline-flex size-11 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:border-gold hover:text-gold xl:hidden"
          >
            <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-royal lg:top-20 xl:hidden"
      >
        <nav aria-label="Navegação principal (menu)" className="container-site flex min-h-full flex-col pt-8 pb-10">
          <ul className="border-t border-white/10">
            {navigation.map((item, index) => (
              <li key={item.id} className="border-b border-white/10">
                <a
                  href={hrefFor(item.id)}
                  onClick={closeFromLink}
                  aria-current={onHome && active === item.id ? 'true' : undefined}
                  className="flex items-baseline gap-5 py-5 font-display text-[1.65rem] leading-none text-white transition-colors hover:text-gold aria-[current]:text-gold"
                >
                  <span className="font-sans text-xs tracking-[0.2em] text-gold/80">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <Button
              href={whatsappLink('geral')}
              external
              icon={WhatsAppIcon}
              iconPosition="start"
              className="w-full"
              onClick={closeFromLink}
            >
              Fale com uma corretora
            </Button>
            <div className="mt-6 flex items-center justify-between text-sm text-white/65">
              <span>CRECI {site.creci}</span>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold"
              >
                <InstagramIcon className="size-4" />
                {site.instagram.handle}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
