import Button from '../components/Button'
import StoryVideo from '../components/StoryVideo'
import { InstagramIcon } from '../components/icons'
import { stories } from '../data/content'
import { site } from '../data/site'

export default function Stories() {
  return (
    <section id="historias" aria-labelledby="historias-title" className="grain relative overflow-hidden bg-royal-900 py-20 text-white lg:py-28">
      <div
        className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(225,189,35,0.12),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
          <p data-animate="fade" className="eyebrow text-gold">
            Histórias de conquista
          </p>
          <h2 id="historias-title" data-animate="fade" className="heading-lg mt-6">
            Cada chave entregue representa um sonho que saiu do papel.
          </h2>
          <div data-animate="fade" className="mt-6 space-y-4 text-[0.98rem] text-white/75">
            <p>
              Por trás de cada imóvel vendido, existe uma história. Uma família que começa uma nova etapa, alguém que
              conquista seu primeiro lar ou uma pessoa que realiza um plano importante.
            </p>
            <p className="font-medium text-white">É por essas histórias que fazemos o nosso trabalho.</p>
            <p>
              Em nossas redes sociais, compartilhamos momentos de imóveis vendidos, entregas de chaves e depoimentos de
              clientes que fizeram parte dessa trajetória.
            </p>
            <p>
              Queremos que você conheça não apenas as oportunidades que oferecemos, mas também as conquistas que
              acompanhamos de perto.
            </p>
          </div>
          <div data-animate="fade" className="mt-8">
            <Button href={site.instagram.url} external variant="light" leadingIcon={InstagramIcon}>
              Acompanhe nossas histórias no Instagram
            </Button>
          </div>
        </div>

        <ul
          data-animate="stagger"
          aria-label="Vídeos de entregas de chaves"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:order-1 lg:col-span-7"
        >
          {stories.map((story, i) => (
            <li key={story.id} className={`w-[68%] shrink-0 snap-start sm:w-auto ${i === 1 ? 'sm:mt-12' : ''}`}>
              <StoryVideo story={story} />
            </li>
          ))}
          <li className="w-[68%] shrink-0 snap-start sm:w-auto sm:mt-24">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-[9/16] flex-col justify-between rounded-[1.25rem] border border-white/15 bg-white/5 p-5 transition-colors duration-500 hover:border-gold/60 hover:bg-white/10"
            >
              <InstagramIcon className="size-8 text-gold" />
              <span>
                <span className="block font-display text-2xl leading-tight">Mais histórias no Instagram</span>
                <span className="mt-2 block text-sm text-white/65">{site.instagram.handle}</span>
              </span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
