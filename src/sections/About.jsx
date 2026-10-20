import { ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import ResponsiveImage from '../components/ResponsiveImage'
import { stories } from '../data/content'
import { site } from '../data/site'

const commitments = [
  'Sabemos que a compra de um imóvel envolve muito mais do que uma negociação. Envolve planejamento, expectativas, dúvidas e, muitas vezes, o sonho de uma vida inteira.',
  'Por isso, nosso compromisso é estar ao seu lado durante essa jornada, ajudando você a entender as possibilidades, conhecer as oportunidades e dar cada passo com mais confiança.',
  'Seja para conquistar o primeiro imóvel, encontrar um novo lar, vender ou investir, queremos fazer parte da sua história.',
]

export default function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="surface-light section-y bg-white">
      <div className="container-site">
        <div className="mx-auto max-w-4xl text-center">
          <p data-animate="fade" className="eyebrow justify-center text-brown">
            Sobre a Delpupo do Carmo
          </p>
          <h2 id="sobre-title" data-animate="fade" className="heading-lg mt-6 text-royal">
            Duas amigas, uma parceria e um propósito: ajudar você a conquistar seu lugar no mundo.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Esquerda */}
          <div className="flex flex-col lg:col-span-4">
            <div data-animate="fade" className="space-y-4 text-[0.98rem] text-royal/75">
              <p>
                A Imobiliária Delpupo do Carmo nasceu em 2025, da união entre{' '}
                <strong className="font-medium text-royal">Dayrlane Delpupo</strong> e{' '}
                <strong className="font-medium text-royal">Juliana do Carmo</strong>, amigas e corretoras de imóveis com
                mais de 10 anos de experiência no mercado imobiliário.
              </p>
              <p>
                A experiência profissional e o desejo de fazer a diferença na vida das pessoas deram origem a um projeto
                em comum: criar uma imobiliária onde cada cliente fosse atendido de perto, com atenção, respeito e
                orientação de verdade.
              </p>
            </div>
            <div data-animate="fade" className="mt-8">
              <Button href="#imoveis" variant="dark">
                Conheça nossas oportunidades
              </Button>
            </div>

            <dl data-animate="stagger" className="mt-12 flex flex-wrap gap-2 lg:mt-auto">
              {[
                ['Fundação', '2025'],
                ['Experiência', '+10 anos'],
                ['CRECI', site.creci],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center gap-2 rounded-full border border-sand px-4 py-2 text-sm">
                  <dt className="text-royal/60">{label}</dt>
                  <dd className="font-medium text-royal">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Centro: fundadoras */}
          <figure className="lg:col-span-4">
            <div data-animate="image" className="relative overflow-hidden rounded-[var(--radius-card)] bg-cream">
              <ResponsiveImage
                name="fundadoras"
                widths={[640, 1000, 1400]}
                sizes="(min-width: 1024px) 32vw, 100vw"
                alt="Dayrlane Delpupo e Juliana do Carmo, fundadoras da imobiliária, sorrindo juntas em um estúdio fotográfico"
                width="1000"
                height="1500"
                imgClassName="aspect-[4/5] w-full object-cover object-[50%_30%]"
              />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-royal/75 px-4 py-3 text-white backdrop-blur-md">
                <span className="block font-display text-lg leading-tight">Dayrlane Delpupo & Juliana do Carmo</span>
                <span className="text-xs tracking-wide text-gold">Fundadoras e corretoras de imóveis</span>
              </figcaption>
            </div>
          </figure>

          {/* Direita */}
          <div className="flex flex-col lg:col-span-4">
            <ol data-animate="stagger" className="border-t border-sand">
              {commitments.map((text, i) => (
                <li key={i} className="flex gap-4 border-b border-sand py-5">
                  <span className="pt-0.5 font-sans text-xs font-medium tracking-[0.15em] text-brown">0{i + 1}</span>
                  <p className="text-[0.95rem] text-royal/75">{text}</p>
                </li>
              ))}
            </ol>

            <blockquote data-animate="fade" className="mt-8">
              <p className="font-display text-[1.45rem] leading-snug text-royal">
                “Delpupo do Carmo. Mais do que encontrar imóveis, queremos ajudar você a realizar conquistas.”
              </p>
            </blockquote>

            <a data-animate="fade" href="#historias" className="group mt-10 flex items-center gap-4 lg:mt-auto lg:pt-10">
              <span className="flex -space-x-3" aria-hidden="true">
                {stories.map((story) => (
                  <img
                    key={story.id}
                    src={story.poster}
                    alt=""
                    width="44"
                    height="44"
                    loading="lazy"
                    className="size-11 rounded-full border-2 border-white object-cover object-[50%_25%]"
                  />
                ))}
                <span className="inline-flex size-11 items-center justify-center rounded-full border-2 border-white bg-royal text-gold">
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </span>
              <span className="text-sm leading-snug">
                <span className="block font-medium text-royal">Histórias reais</span>
                <span className="text-royal/65">Assista às entregas de chaves</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
