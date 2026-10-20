/**
 * Divide um texto em palavras mascaradas para a revelação do título.
 * O texto completo fica disponível para leitores de tela em um único nó.
 */
export default function SplitWords({ text }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]">
            <span data-word className="inline-block will-change-transform">
              {word}
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </>
  )
}
