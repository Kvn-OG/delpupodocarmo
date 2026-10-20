import { useRef, useState } from 'react'
import { Play } from 'lucide-react'

/**
 * Vídeo vertical real, carregado somente quando o visitante dá play
 * (preload="none" + poster). Ao iniciar, pausa os demais vídeos da página.
 */
export default function StoryVideo({ story }) {
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)

  const pauseOthers = (current) =>
    document.querySelectorAll('video[data-story]').forEach((v) => v !== current && v.pause())

  const play = () => {
    pauseOthers(videoRef.current)
    setStarted(true)
    videoRef.current?.play()
  }

  return (
    <figure className="group">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] bg-royal-800">
        <video
          ref={videoRef}
          data-story
          className="size-full object-cover"
          src={story.src}
          poster={story.poster}
          preload="none"
          playsInline
          controls={started}
          onPlay={(e) => pauseOthers(e.currentTarget)}
          aria-label={`${story.title}: ${story.names}`}
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-royal-900/90 via-transparent to-transparent p-4 text-left text-white"
          >
            <span>
              <span className="block text-[0.68rem] tracking-[0.18em] text-gold uppercase">{story.title}</span>
              <span className="mt-1 block font-display text-xl leading-tight">{story.names}</span>
            </span>
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-royal transition-transform duration-500 ease-(--ease-brand) group-hover:scale-110">
              <Play className="ml-0.5 size-5" fill="currentColor" aria-hidden="true" />
            </span>
            <span className="sr-only">
              Assistir ao vídeo: {story.title} — {story.names}
            </span>
          </button>
        )}
      </div>
      {started && (
        <figcaption className="mt-3 text-sm text-white/70">
          {story.title} · <span className="text-white">{story.names}</span>
        </figcaption>
      )}
    </figure>
  )
}
