import { FULL_MOTION, gsap, ScrollTrigger } from './gsap'

/**
 * Animações de rolagem orientadas por atributos.
 *
 * Os estados iniciais (opacidade 0, deslocamento etc.) são aplicados pelo
 * próprio GSAP. Se o JavaScript ou o GSAP falharem, o conteúdo continua
 * visível. Com `prefers-reduced-motion: reduce`, nada é animado.
 *
 *  data-animate="fade"     → título/parágrafo sobe com fade (agrupado via batch)
 *  data-animate="stagger"  → filhos diretos entram em sequência
 *  data-animate="image"    → revelação por máscara + leve zoom out da imagem
 *  data-animate="line"     → divisor horizontal cresce da esquerda
 *  data-parallax="12"      → deslocamento vertical sutil (yPercent) com scrub
 */
export function initScrollAnimations(root = document) {
  const mm = gsap.matchMedia()

  mm.add(FULL_MOTION, () => {
    const q = (selector) => gsap.utils.toArray(root.querySelectorAll(selector))

    const fades = q('[data-animate="fade"]')
    if (fades.length) {
      gsap.set(fades, { autoAlpha: 0, y: 28 })
      ScrollTrigger.batch(fades, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, overwrite: true }),
      })
    }

    q('[data-animate="stagger"]').forEach((group) => {
      const items = group.children
      gsap.from(items, {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.1,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      })
    })

    q('[data-animate="image"]').forEach((frame) => {
      const media = frame.querySelector('img, video')
      const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 85%', once: true } })
      tl.fromTo(
        frame,
        { clipPath: 'inset(18% 0% 0% 0%)', autoAlpha: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 1.3, ease: 'expo.out', clearProps: 'clipPath' },
      )
      if (media) tl.from(media, { scale: 1.12, duration: 1.6, ease: 'expo.out' }, 0)
    })

    q('[data-animate="line"]').forEach((line) => {
      gsap.from(line, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: line, start: 'top 92%', once: true },
      })
    })

    q('[data-parallax]').forEach((el) => {
      const amount = Number(el.dataset.parallax) || 10
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
  })

  return mm
}
