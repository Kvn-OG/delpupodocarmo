import Button from '../components/Button'
import StoryVideo from '../components/StoryVideo'
import { InstagramIcon } from '../components/icons'
import { stories } from '../data/content'
import { site } from '../data/site'

export default function Testimonials() {
  return (
    <section aria-labelledby="historias-title" className="surface-light section-y overflow-hidden bg-white">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p data-animate="fade" className="eyebrow text-brown">
            Histórias de conquista
          </p>
          <h2 id="historias-title" data-animate="fade" className="heading-lg mt-6 text-royal">
            Cada chave entregue representa um sonho que saiu do papel.
          </h2>
          <div className="text-lead mt-8 space-y-5 text-royal/75">
            <p data-animate="fade">
              Por trás de cada imóvel vendido, existe uma história. Uma família que começa uma nova etapa, alguém que
              conquista seu primeiro lar ou uma pessoa que realiza um plano importante.
            </p>
            <p data-animate="fade" className="font-medium text-royal">
              É por essas histórias que fazemos o nosso trabalho.
            </p>
            <p data-animate="fade">
              Em nossas redes sociais, compartilhamos momentos de imóveis vendidos, entregas de chaves e depoimentos de
              clientes que fizeram parte dessa trajetória.
            </p>
            <p data-animate="fade">
              Queremos que você conheça não apenas as oportunidades que oferecemos, mas também as conquistas que
              acompanhamos de perto.
            </p>
          </div>
          <div data-animate="fade" className="mt-10">
            <Button href={site.instagram.url} external variant="dark" icon={InstagramIcon} iconPosition="start">
              Acompanhe nossas histórias no Instagram
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          {/* No mobile: carrossel horizontal com snap; no desktop: duas colunas com deslocamento */}
          <ul
            data-animate="stagger"
            aria-label="Vídeos de entregas de chaves"
            className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {stories.map((story, i) => (
              <li key={story.id} className={`w-[72%] shrink-0 snap-start sm:w-auto ${i % 2 === 1 ? 'sm:mt-20' : ''}`}>
                <StoryVideo story={story} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
