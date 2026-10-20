import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { WhatsAppIcon } from './icons'
import { whatsappLink } from '../lib/whatsapp'
import { scrollToSection } from '../lib/smoothScroll'

/**
 * Atalhos flutuantes: WhatsApp (sempre acessível após o hero)
 * e voltar ao topo.
 */
export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const state = visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => scrollToSection('inicio')}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={`inline-flex size-11 items-center justify-center rounded-full border border-royal/10 bg-white text-royal shadow-lg shadow-royal/10 transition-all duration-500 ease-(--ease-brand) hover:bg-cream ${state}`}
      >
        <ArrowUp className="size-4" aria-hidden="true" />
        <span className="sr-only">Voltar ao topo</span>
      </button>

      <a
        href={whatsappLink('geral')}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={`group inline-flex h-14 items-center gap-3 rounded-full bg-royal pr-5 pl-4 text-white shadow-xl shadow-royal/25 ring-1 ring-gold/40 transition-all duration-500 ease-(--ease-brand) hover:bg-royal-700 ${state}`}
      >
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-gold text-royal">
          <WhatsAppIcon className="size-5" />
        </span>
        <span className="text-sm font-medium">
          <span className="hidden sm:inline">Fale pelo </span>WhatsApp
        </span>
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </div>
  )
}
