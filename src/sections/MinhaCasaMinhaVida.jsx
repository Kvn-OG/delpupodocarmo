import { Info } from 'lucide-react'
import Button from '../components/Button'
import ResponsiveImage from '../components/ResponsiveImage'
import { WhatsAppIcon } from '../components/icons'
import { whatsappLink } from '../lib/whatsapp'

const steps = [
  'Entender os caminhos disponíveis',
  'Conhecer os imóveis que combinam com seu objetivo',
  'Identificar os próximos passos',
]

export default function MinhaCasaMinhaVida() {
  return (
    <section
      id="minha-casa-minha-vida"
      aria-labelledby="mcmv-title"
      className="surface-light section-y relative overflow-hidden bg-cream"
    >
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <figure className="relative lg:col-span-6">
          <div data-animate="image" className="arch-tl relative overflow-hidden rounded-tr-md rounded-b-md bg-sand">
            <div data-parallax="10" className="scale-110">
              <ResponsiveImage
                name="familia"
                widths={[640, 1100, 1600]}
                sizes="(min-width: 1024px) 48vw, 100vw"
                alt="Pai sorridente carregando os dois filhos pequenos em frente a uma casa com cerca branca"
                width="1100"
                height="734"
                imgClassName="aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
              />
            </div>
            <span className="absolute top-3 right-3 rounded-sm bg-royal/60 px-2 py-0.5 text-[0.68rem] tracking-wide text-white/85 backdrop-blur-sm">
              Imagem ilustrativa
            </span>
          </div>

          <div
            data-animate="fade"
            className="relative -mt-16 ml-auto w-[85%] rounded-md bg-royal p-6 text-white shadow-[0_30px_60px_-30px_rgba(21,43,35,0.6)] sm:w-3/4 sm:p-7 lg:absolute lg:right-0 lg:-bottom-10 lg:mt-0 lg:-mr-8 lg:w-[70%]"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">Como ajudamos</p>
            <ol className="mt-4 space-y-3">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4 text-[0.98rem] text-white/85">
                  <span className="font-display text-gold">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </figure>

        <div className="lg:col-span-6 lg:pl-8 xl:pl-14">
          <p data-animate="fade" className="eyebrow text-brown">
            Sua casa própria
          </p>
          <h2 id="mcmv-title" data-animate="fade" className="heading-lg mt-6 text-royal">
            A casa própria pode começar com uma conversa.
          </h2>

          <div className="text-lead mt-8 space-y-5 text-royal/75">
            <p data-animate="fade">
              Se você sonha em sair do aluguel e conquistar seu próprio lar, talvez este seja o momento de conhecer as
              oportunidades disponíveis.
            </p>
            <p data-animate="fade">
              Com o <strong className="font-medium text-royal">Minha Casa, Minha Vida</strong>, existem possibilidades
              de aquisição de imóveis para famílias que atendem aos critérios do programa. E você não precisa começar
              sabendo tudo sobre financiamento, documentação ou condições de compra.
            </p>
            <p data-animate="fade">
              A equipe da Delpupo do Carmo pode ajudar você a entender os caminhos disponíveis, conhecer os imóveis que
              combinam com seu objetivo e identificar os próximos passos.
            </p>
            <p data-animate="fade" className="font-medium text-royal">
              Vamos conversar sobre a sua realidade e descobrir quais oportunidades podem fazer sentido para você?
            </p>
          </div>

          <div data-animate="fade" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={whatsappLink('mcmv')} external variant="dark">
              Quero conquistar minha casa própria
            </Button>
            <Button href={whatsappLink('financiamento')} external variant="outlineDark" icon={WhatsAppIcon} iconPosition="start">
              Tire suas dúvidas pelo WhatsApp
            </Button>
          </div>

          <p data-animate="fade" className="mt-10 flex gap-3 border-t border-royal/10 pt-6 text-sm leading-relaxed text-royal/65">
            <Info className="mt-0.5 size-4 shrink-0 text-brown" aria-hidden="true" />
            As condições, os subsídios e a elegibilidade dependem das regras vigentes, da renda familiar, da análise de
            crédito e dos demais critérios aplicáveis.
          </p>
        </div>
      </div>
    </section>
  )
}
