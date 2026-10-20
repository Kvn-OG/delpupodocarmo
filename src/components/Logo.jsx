import logoWhite from '../assets/brand/logo-delpupo-branco.svg'
import logoColor from '../assets/brand/logo-delpupo.svg'

// Proporção original do arquivo vetorial: 1749.45 × 796.79
const RATIO = 1749.45 / 796.79

/** Logotipo oficial. `variant="light"` para fundos escuros, `"color"` para fundos claros. */
export default function Logo({ variant = 'light', height = 48, className = '' }) {
  return (
    <img
      src={variant === 'light' ? logoWhite : logoColor}
      alt="Imobiliária Delpupo do Carmo — Negócios Imobiliários"
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      decoding="async"
    />
  )
}
