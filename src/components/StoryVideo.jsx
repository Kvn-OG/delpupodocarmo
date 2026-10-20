import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

/**
 * Vídeo vertical real, carregado somente quando o visitante dá play
 * (preload="none" + poster). Ao iniciar, pausa os demais vídeos da página.
 */
export default function StoryVideo({ story }) {
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)

  const play = () => {
    document.querySelectorAll('video[data-story]').forEach((v) => v !== videoRef.current && v.pause())
    setStarted(true)
    videoRef.current?.play()
  }

  return (
    <figure className="group">
      <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-royal">
        <video
          ref={videoRef}
          data-story
          className="size-full object-cover"
          src={story.src}
          poster={story.poster}
          preload="none"
          playsInline
          controls={started}
          onPlay={(e) =>
            document.querySelectorAll('video[data-story]').forEach((v) => v !== e.currentTarget && v.pause())
          }
          aria-label={`${story.title}: ${story.names}`}
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-royal/85 via-royal/10 to-transparent text-white"
          >
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-gold text-royal shadow-xl transition-transform duration-500 ease-(--ease-brand) group-hover:scale-110">
              <Play className="ml-1 size-6" fill="currentColor" aria-hidden="true" />
            </span>
            <span className="sr-only">
              Assistir ao vídeo: {story.title} — {story.names}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4">
        <span className="block text-xs font-medium tracking-[0.2em] text-brown uppercase">{story.title}</span>
        <span className="mt-1 block font-display text-xl text-royal">{story.names}</span>
      </figcaption>
    </figure>
  )
}
