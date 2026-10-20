import ResponsiveImage from '../components/ResponsiveImage'
import { differentials } from '../data/content'

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="diferenciais-title" className="surface-light section-y bg-white">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-animate="fade" className="eyebrow text-brown">
              Por que escolher a Delpupo do Carmo
            </p>
            <h2 id="diferenciais-title" data-animate="fade" className="heading-lg mt-6 max-w-[16ch] text-royal">
              Aqui, você não é só mais um atendimento.
            </h2>
          </div>
          <div data-animate="fade" className="space-y-3 text-[0.98rem] text-royal/75 lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p>
              Sabemos que cada pessoa chega com uma história diferente. Tem quem esteja procurando o primeiro imóvel,
              quem precise de mais espaço para a família, quem queira vender e quem esteja planejando investir.
            </p>
            <p className="font-medium text-royal">É por isso que nosso atendimento começa com uma conversa.</p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <figure
            data-animate="image"
            className="relative min-h-[24rem] overflow-hidden rounded-[var(--radius-card)] bg-cream sm:col-span-2 lg:row-span-2 lg:min-h-0"
          >
            <ResponsiveImage
              name="sala-aconchegante"
              widths={[640, 1100]}
              sizes="(min-width: 1024px) 48vw, 100vw"
              alt="Sala de estar aconchegante com sofá, plantas e luz natural entrando pela janela"
              width="1100"
              height="818"
              className="absolute inset-0"
              imgClassName="size-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 text-[0.7rem] text-royal backdrop-blur-sm">
              Imagem ilustrativa
            </span>
            <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-royal/80 p-6 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-7">
              <span className="mb-4 block h-0.5 w-10 bg-gold" aria-hidden="true" />
              <span className="block font-display text-[1.3rem] leading-snug sm:text-[1.55rem]">
                Nosso objetivo é que você se sinta acompanhado desde a primeira conversa até os próximos passos da sua
                conquista.
              </span>
            </figcaption>
          </figure>

          {differentials.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              data-animate="fade"
              className="group flex flex-col rounded-[var(--radius-card)] bg-cream p-7 transition-colors duration-500 hover:bg-royal"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-brown transition-colors duration-500 group-hover:bg-gold group-hover:text-royal">
                <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-10 text-[1.4rem] leading-tight text-royal transition-colors duration-500 group-hover:text-white">
                {title}
              </h3>
              <p className="mt-3 text-[0.92rem] text-royal/70 transition-colors duration-500 group-hover:text-white/75">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
