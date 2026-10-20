import Lenis from 'lenis'
import { gsap, prefersReducedMotion, ScrollTrigger } from './gsap'

// Mesmo valor do scroll-padding-top do <html> (5.5rem), que o Lenis já considera
const HEADER_OFFSET = 88

let lenis = null

/**
 * Inicializa o Lenis uma única vez, usando o ticker do GSAP como único
 * loop de animação (sem requestAnimationFrame concorrente).
 * Não é ativado quando o usuário prefere movimento reduzido.
 * Em telas sensíveis ao toque o Lenis mantém a rolagem nativa (syncTouch: false).
 */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {}

  const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false })
  const onTick = (time) => instance.raf(time * 1000)

  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)
  lenis = instance

  return () => {
    gsap.ticker.remove(onTick)
    gsap.ticker.lagSmoothing(500, 33)
    instance.destroy()
    if (lenis === instance) lenis = null
  }
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}

/**
 * Rola até uma seção respeitando a altura do header e move o foco para
 * ela, para que leitores de tela e teclado acompanhem a navegação.
 */
export function scrollToSection(id, { updateHash = true } = {}) {
  const target = id === 'inicio' ? document.getElementById('inicio') ?? document.body : document.getElementById(id)
  if (!target) return false

  const focusTarget = () => {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }

  if (lenis) {
    lenis.scrollTo(id === 'inicio' ? 0 : target, { duration: 1.2, force: true, onComplete: focusTarget })
  } else {
    const top = id === 'inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    focusTarget()
  }

  if (updateHash) history.pushState(null, '', id === 'inicio' ? window.location.pathname : `#${id}`)
  return true
}

/** Intercepta cliques em links âncora da própria página. */
export function bindAnchorLinks() {
  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
    const link = event.target.closest('a[href*="#"]')
    if (!link) return
    const url = new URL(link.href, window.location.href)
    if (url.pathname !== window.location.pathname || !url.hash) return
    const id = decodeURIComponent(url.hash.slice(1))
    if (scrollToSection(id)) event.preventDefault()
  }

  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}
