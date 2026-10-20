import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

const POSTER = '/media/hero-loop-poster.webp'

/**
 * Loop de marca (assets/fundo_verde_loop.mp4), sem som.
 * - Só toca enquanto está visível (economiza CPU e bateria).
 * - `eager`: começa a carregar imediatamente (hero). Senão, carrega ao se aproximar da tela.
 * - Com movimento reduzido, mostra apenas o primeiro frame.
 */
export default function LoopVideo({ eager = false, className = '' }) {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!prefersReducedMotion())
  }, [])

  useEffect(() => {
    const video = ref.current
    if (!enabled || !video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [enabled])

  if (!enabled) {
    return <img src={POSTER} alt="" aria-hidden="true" className={className} loading={eager ? 'eager' : 'lazy'} />
  }

  return (
    <video
      ref={ref}
      className={className}
      poster={POSTER}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? 'auto' : 'none'}
      disablePictureInPicture
      aria-hidden="true"
    >
      <source src="/media/hero-loop-1920.mp4" type="video/mp4" media="(min-width: 1024px)" />
      <source src="/media/hero-loop.mp4" type="video/mp4" />
    </video>
  )
}
