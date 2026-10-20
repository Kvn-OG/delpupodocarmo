/**
 * Cabeçalho editorial de seção: identificador + título (+ texto opcional).
 * `tone="dark"` para fundos verdes.
 */
export default function SectionHeading({
  eyebrow,
  title,
  id,
  tone = 'light',
  size = 'lg',
  align = 'left',
  className = '',
  children,
}) {
  const dark = tone === 'dark'
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <p data-animate="fade" className={`eyebrow ${dark ? 'text-gold' : 'text-brown'} ${align === 'center' ? 'justify-center' : ''}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        data-animate="fade"
        className={`${size === 'xl' ? 'heading-xl' : 'heading-lg'} mt-6 ${dark ? 'text-white' : 'text-royal'}`}
      >
        {title}
      </h2>
      {children && (
        <div data-animate="fade" className={`text-lead mt-6 space-y-4 ${dark ? 'text-white/75' : 'text-royal/75'}`}>
          {children}
        </div>
      )}
    </div>
  )
}
