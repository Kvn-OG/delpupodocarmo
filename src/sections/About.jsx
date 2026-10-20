import Button from '../components/Button'
import ResponsiveImage from '../components/ResponsiveImage'
import { site } from '../data/site'

const facts = [
  { value: '2025', label: 'Ano de fundação' },
  { value: '+10 anos', label: 'De experiência das fundadoras' },
  { value: site.creci, label: 'CRECI' },
]

export default function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="surface-light section-y relative overflow-clip bg-white">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <figure>
              <div data-animate="image" className="arch-tr relative overflow-hidden rounded-tl-md rounded-b-md bg-cream">
                <ResponsiveImage
                  name="fundadoras"
                  widths={[640, 1000, 1400]}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  alt="Dayrlane Delpupo e Juliana do Carmo, fundadoras da imobiliária, sorrindo juntas em um estúdio fotográfico"
                  width="1000"
                  height="1500"
                  imgClassName="aspect-[4/5] w-full object-cover object-[50%_30%] lg:aspect-[2/3]"
                />
              </div>
              <figcaption data-animate="fade" className="mt-5 flex items-center gap-3 text-sm text-royal/70">
                <span className="h-px w-8 bg-brown/60" aria-hidden="true" />
                Dayrlane Delpupo e Juliana do Carmo, fundadoras
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
          <p data-animate="fade" className="eyebrow text-brown">
            Sobre a Delpupo do Carmo
          </p>
          <h2 id="sobre-title" data-animate="fade" className="heading-lg mt-6 text-royal">
            Duas amigas, uma parceria e um propósito: ajudar você a conquistar seu lugar no mundo.
          </h2>

          <div className="mt-10 space-y-5 text-royal/75 text-lead">
            <p data-animate="fade">
              A Imobiliária Delpupo do Carmo nasceu em 2025, da união entre <strong className="font-medium text-royal">Dayrlane Delpupo</strong> e{' '}
              <strong className="font-medium text-royal">Juliana do Carmo</strong>, amigas e corretoras de imóveis com mais de 10 anos de
              experiência no mercado imobiliário.
            </p>
            <p data-animate="fade">
              A experiência profissional e o desejo de fazer a diferença na vida das pessoas deram origem a um projeto em
              comum: criar uma imobiliária onde cada cliente fosse atendido de perto, com atenção, respeito e orientação
              de verdade.
            </p>
            <p data-animate="fade">
              Sabemos que a compra de um imóvel envolve muito mais do que uma negociação. Envolve planejamento,
              expectativas, dúvidas e, muitas vezes, o sonho de uma vida inteira.
            </p>
            <p data-animate="fade">
              Por isso, nosso compromisso é estar ao seu lado durante essa jornada, ajudando você a entender as
              possibilidades, conhecer as oportunidades e dar cada passo com mais confiança.
            </p>
            <p data-animate="fade">
              Seja para conquistar o primeiro imóvel, encontrar um novo lar, vender ou investir, queremos fazer parte da
              sua história.
            </p>
          </div>

          <dl data-animate="stagger" className="mt-12 grid grid-cols-3 border-y border-sand">
            {facts.map((fact, i) => (
              <div key={fact.label} className={`flex flex-col py-6 ${i > 0 ? 'border-l border-sand pl-4 sm:pl-6' : 'pr-4'}`}>
                <dt className="text-xs leading-snug text-royal/65 sm:text-sm">{fact.label}</dt>
                <dd className="order-first mt-1 font-display text-lg text-royal sm:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <blockquote data-animate="fade" className="relative mt-12 border-l-2 border-gold pl-6 sm:pl-8">
            <p className="font-display text-[1.45rem] leading-snug text-royal sm:text-[1.7rem]">
              Delpupo do Carmo. Mais do que encontrar imóveis, queremos ajudar você a realizar conquistas.
            </p>
          </blockquote>

          <div data-animate="fade" className="mt-10">
            <Button href="#imoveis" variant="dark">
              Conheça nossas oportunidades
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
