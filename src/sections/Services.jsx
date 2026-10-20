import Button from '../components/Button'
import ResponsiveImage from '../components/ResponsiveImage'
import ServiceCard from '../components/ServiceCard'
import { WhatsAppIcon } from '../components/icons'
import { services } from '../data/content'
import { whatsappLink } from '../lib/whatsapp'

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="grain section-y relative overflow-clip bg-royal text-white">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p data-animate="fade" className="eyebrow text-gold">
              Como podemos ajudar
            </p>
            <h2 id="servicos-title" data-animate="fade" className="heading-lg mt-6 text-white">
              A gente acompanha você em cada etapa.
            </h2>
            <p data-animate="fade" className="text-lead mt-6 text-white/75">
              Comprar, vender ou alugar um imóvel pode parecer complicado quando surgem dúvidas sobre documentação,
              financiamento e negociação. Nosso papel é tornar esse caminho mais claro, com atendimento próximo e
              orientação de acordo com as necessidades de cada cliente.
            </p>

            <div data-animate="fade" className="mt-10">
              <Button href={whatsappLink('geral')} external icon={WhatsAppIcon} iconPosition="start">
                Vamos conversar sobre o seu objetivo?
              </Button>
            </div>

            <div data-animate="image" className="arch-tl relative mt-14 hidden overflow-hidden rounded-tr-md rounded-b-md lg:block">
              <ResponsiveImage
                name="sala-aconchegante"
                widths={[640, 1100]}
                sizes="38vw"
                alt="Sala de estar aconchegante com sofá, plantas e luz natural entrando pela janela"
                width="1100"
                height="818"
                imgClassName="aspect-[16/10] w-full object-cover"
              />
              <span className="absolute right-3 bottom-3 rounded-sm bg-royal/70 px-2 py-0.5 text-[0.68rem] tracking-wide text-white/80">
                Imagem ilustrativa
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          <ul data-animate="stagger" className="divide-y divide-white/10 border-y border-white/10">
            {services.map((service, index) => (
              <li key={service.id}>
                <ServiceCard service={service} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
