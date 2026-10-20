import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/gsap'

/**
 * Loop de marca, sem som, em três versões:
 * - portrait: assets/fundo_verde_loop_vertical.mp4 (celulares e tablets em pé)
 * - wide:     assets/fundo_verde_loop.mp4 em 1920px (desktop)
 * - default:  assets/fundo_verde_loop.mp4 em 1280px (telas pequenas deitadas)
 */
const VARIANTS = {
  portrait: { src: '/media/hero-loop-vertical.mp4', poster: '/media/hero-loop-vertical-poster.webp' },
  wide: { src: '/media/hero-loop-1920.mp4', poster: '/media/hero-loop-poster.webp' },
  default: { src: '/media/hero-loop.mp4', poster: '/media/hero-loop-poster.webp' },
}

const PORTRAIT_QUERY = '(max-width: 1023px) and (orientation: portrait)'
const WIDE_QUERY = '(min-width: 1024px)'

function pickVariant() {
  if (window.matchMedia(PORTRAIT_QUERY).matches) return 'portrait'
  if (window.matchMedia(WIDE_QUERY).matches) return 'wide'
  return 'default'
}

/**
 * - Só toca enquanto está visível (economiza CPU e bateria).
 * - `eager`: começa a carregar imediatamente (hero). Senão, carrega ao se aproximar da tela.
 * - Troca de versão ao girar o aparelho ou redimensionar a janela.
 * - Com movimento reduzido, mostra apenas o primeiro frame.
 */
export default function LoopVideo({ eager = false, className = '' }) {
  const ref = useRef(null)
  const visibleRef = useRef(false)
  const [motion] = useState(() => !prefersReducedMotion())
  const [variant, setVariant] = useState(pickVariant)
  const { src, poster } = VARIANTS[variant]

  // Acompanha rotação/redimensionamento
  useEffect(() => {
    const queries = [PORTRAIT_QUERY, WIDE_QUERY].map((q) => window.matchMedia(q))
    const onChange = () => setVariant(pickVariant())
    queries.forEach((mq) => mq.addEventListener('change', onChange))
    return () => queries.forEach((mq) => mq.removeEventListener('change', onChange))
  }, [])

  // Toca apenas quando visível
  useEffect(() => {
    const video = ref.current
    if (!motion || !video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [motion])

  // Ao trocar de versão, retoma a reprodução se estiver na tela
  useEffect(() => {
    const video = ref.current
    if (motion && video && visibleRef.current) video.play().catch(() => {})
  }, [src, motion])

  if (!motion) {
    return <img src={poster} alt="" aria-hidden="true" className={className} loading={eager ? 'eager' : 'lazy'} />
  }

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? 'auto' : 'none'}
      disablePictureInPicture
      aria-hidden="true"
    />
  )
}
