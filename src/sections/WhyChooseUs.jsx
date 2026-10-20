import ResponsiveImage from '../components/ResponsiveImage'
import { differentials } from '../data/content'

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="diferenciais-title" className="surface-light section-y bg-white">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-animate="fade" className="eyebrow text-brown">
              Por que escolher a Delpupo do Carmo
            </p>
            <h2 id="diferenciais-title" data-animate="fade" className="heading-lg mt-6 max-w-[18ch] text-royal">
              Aqui, você não é só mais um atendimento.
            </h2>
          </div>
          <div className="space-y-4 text-lead text-royal/75 lg:col-span-5 lg:pt-14">
            <p data-animate="fade">
              Sabemos que cada pessoa chega com uma história diferente. Tem quem esteja procurando o primeiro imóvel,
              quem precise de mais espaço para a família, quem queira vender e quem esteja planejando investir.
            </p>
            <p data-animate="fade" className="font-medium text-royal">
              É por isso que nosso atendimento começa com uma conversa.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-5">
            <div data-animate="image" className="relative overflow-hidden rounded-md bg-cream">
              <ResponsiveImage
                name="fundadoras"
                widths={[640, 1000, 1400]}
                sizes="(min-width: 1024px) 38vw, 100vw"
                alt="As corretoras Dayrlane Delpupo e Juliana do Carmo, lado a lado"
                width="1000"
                height="1500"
                imgClassName="aspect-[4/3] w-full object-cover object-[50%_42%] lg:aspect-[4/5]"
              />
            </div>
          </figure>

          <div className="lg:col-span-7">
            <ul data-animate="stagger" className="grid gap-x-10 sm:grid-cols-2">
              {differentials.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className={`border-t border-sand py-8 ${i < 2 ? 'sm:pt-0 sm:border-t-0' : ''}`}>
                  <Icon className="size-7 text-brown" strokeWidth={1.3} aria-hidden="true" />
                  <h3 className="mt-5 font-display text-[1.5rem] leading-tight text-royal">{title}</h3>
                  <p className="mt-3 text-royal/75">{text}</p>
                </li>
              ))}
            </ul>

            <div className="relative mt-6 overflow-hidden rounded-md bg-royal p-8 sm:p-10">
              <span className="absolute top-0 left-8 h-1 w-16 bg-gold sm:left-10" aria-hidden="true" />
              <p data-animate="fade" className="font-display text-[1.4rem] leading-snug text-white sm:text-[1.7rem]">
                Nosso objetivo é que você se sinta acompanhado desde a primeira conversa até os próximos passos da sua
                conquista.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
