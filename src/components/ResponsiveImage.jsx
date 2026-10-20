/**
 * Imagem responsiva com WebP + JPG de fallback.
 * Espera arquivos em /public/images/{name}-{largura}.{webp|jpg}.
 */
export default function ResponsiveImage({
  name,
  widths,
  sizes = '100vw',
  alt,
  width,
  height,
  priority = false,
  className = '',
  imgClassName = '',
  ...props
}) {
  const srcSet = (ext) => widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `/images/${name}-${widths[Math.min(1, widths.length - 1)]}.jpg`

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={fallback}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={imgClassName}
        {...props}
      />
    </picture>
  )
}
