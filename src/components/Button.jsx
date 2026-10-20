import { ArrowUpRight } from 'lucide-react'

const base =
  'group/btn relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full text-[0.92rem] font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-(--ease-brand) active:scale-[0.98]'

// [pílula, círculo do ícone]
const variants = {
  gold: ['bg-gold text-royal hover:bg-gold-light', 'bg-royal text-gold'],
  light: ['bg-white text-royal hover:bg-cream', 'bg-royal text-white'],
  dark: ['bg-royal text-white hover:bg-royal-700', 'bg-gold text-royal'],
  glass: ['border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20', 'bg-white text-royal'],
  outlineDark: ['border border-royal/20 text-royal hover:border-royal hover:bg-royal hover:text-white', 'bg-royal text-white group-hover/btn:bg-gold group-hover/btn:text-royal'],
}

/**
 * Botão/link em pílula da marca. Com `href` renderiza <a>; `external` abre em nova aba.
 * - `icon` padrão: seta dentro de um círculo à direita (estilo da referência).
 * - `leadingIcon`: ícone simples à esquerda (ex.: WhatsApp).
 */
export default function Button({
  href,
  external = false,
  variant = 'gold',
  icon: Icon = ArrowUpRight,
  leadingIcon: Leading,
  className = '',
  children,
  ...props
}) {
  const [pill, circle] = variants[variant]
  const padding = Icon ? 'pl-6 pr-1.5 py-1.5' : 'px-6 py-3'
  const classes = `${base} ${pill} ${padding} ${className}`

  const content = (
    <>
      {Leading && <Leading className="size-[1.05rem] shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {Icon && (
        <span
          className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${circle}`}
          aria-hidden="true"
        >
          <Icon className="size-4 transition-transform duration-500 ease-(--ease-brand) group-hover/btn:rotate-45" />
        </span>
      )}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
