import { ArrowRight } from 'lucide-react'

const base =
  'group/btn relative inline-flex min-h-12 items-center justify-center gap-3 rounded-md px-6 py-3 text-[0.95rem] font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-(--ease-brand)'

const variants = {
  gold: 'bg-gold text-royal hover:bg-gold-light shadow-[0_10px_30px_-12px_rgba(225,189,35,0.55)]',
  dark: 'bg-royal text-white hover:bg-royal-700',
  outlineLight: 'border border-white/35 text-white hover:border-gold hover:text-gold',
  outlineDark: 'border border-royal/25 text-royal hover:border-royal hover:bg-royal hover:text-white',
  link: 'min-h-0 px-0 py-1 text-royal underline-offset-[6px] hover:underline',
  linkLight: 'min-h-0 px-0 py-1 text-white underline-offset-[6px] hover:text-gold hover:underline',
}

/**
 * Botão/link da marca. Com `href` renderiza <a>; `external` abre em nova aba
 * com rel seguro. `icon` substitui a seta padrão (use `icon={null}` para remover).
 */
export default function Button({
  href,
  external = false,
  variant = 'gold',
  icon: Icon = ArrowRight,
  iconPosition = 'end',
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${className}`
  const iconEl = Icon ? (
    <Icon
      className={`size-[1.1rem] shrink-0 transition-transform duration-300 ease-(--ease-brand) ${
        Icon === ArrowRight ? 'group-hover/btn:translate-x-1' : ''
      }`}
      aria-hidden="true"
    />
  ) : null

  const content = (
    <>
      {iconPosition === 'start' && iconEl}
      <span>{children}</span>
      {iconPosition === 'end' && iconEl}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
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
