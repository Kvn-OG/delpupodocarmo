import { useEffect, useLayoutEffect } from 'react'
import { initScrollAnimations } from '../lib/animations'
import { ScrollTrigger } from '../lib/gsap'
import { bindAnchorLinks, initSmoothScroll, scrollToSection } from '../lib/smoothScroll'

/**
 * Liga smooth scroll, links âncora e animações de rolagem para a página.
 * Tudo é desfeito ao desmontar (inclusive no double-mount do StrictMode).
 */
export function useSiteMotion(rootRef) {
  useLayoutEffect(() => {
    const destroyScroll = initSmoothScroll()
    const unbindAnchors = bindAnchorLinks()
    const mm = initScrollAnimations(rootRef.current ?? document)

    // Recalcula posições quando fontes e imagens terminam de carregar
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
      unbindAnchors()
      destroyScroll()
    }
  }, [rootRef])

  // Abrir o site já em uma seção (ex.: /#contato) depois que o React renderizou
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const timer = setTimeout(() => scrollToSection(id, { updateHash: false }), 60)
    return () => clearTimeout(timer)
  }, [])
}
