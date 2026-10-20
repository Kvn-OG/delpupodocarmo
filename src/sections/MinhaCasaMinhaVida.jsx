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
    <section id="minha-casa-minha-vida" aria-labelledby="mcmv-title" className="surface-light frame bg-cream">
      <div className="grid gap-10 p-2.5 sm:p-4 lg:grid-cols-2 lg:gap-0">
        <figure className="relative">
          <div data-animate="image" className="relative h-full min-h-[26rem] overflow-hidden rounded-[1.4rem]">
            <div data-parallax="10" className="absolute inset-0 scale-110">
              <ResponsiveImage
                name="familia"
                widths={[640, 1100, 1600]}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Pai sorridente carregando os dois filhos pequenos em frente a uma casa com cerca branca"
                width="1100"
                height="734"
                className="block size-full"
                imgClassName="size-full object-cover"
              />
            </div>
            <span className="absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 text-[0.7rem] text-royal backdrop-blur-sm">
              Imagem ilustrativa
            </span>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-royal/80 p-5 text-white backdrop-blur-md sm:inset-x-auto sm:left-6 sm:bottom-6 sm:w-80">
              <p className="text-[0.7rem] font-medium tracking-[0.2em] text-gold uppercase">Como ajudamos</p>
              <ol className="mt-3 space-y-2">
                {steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-[0.92rem] text-white/90">
                    <span className="font-display text-gold">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </figure>

        <div className="px-3 pb-8 sm:px-6 lg:px-14 lg:py-20 xl:px-20">
          <p data-animate="fade" className="eyebrow text-brown">
            Sua casa própria
          </p>
          <h2 id="mcmv-title" data-animate="fade" className="heading-lg mt-6 text-royal">
            A casa própria pode começar com uma conversa.
          </h2>
          <div className="mt-7 space-y-4 text-[0.98rem] text-royal/75">
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

          <div data-animate="fade" className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={whatsappLink('mcmv')} external variant="dark">
              Quero conquistar minha casa própria
            </Button>
            <Button href={whatsappLink('financiamento')} external variant="outlineDark" leadingIcon={WhatsAppIcon} icon={null}>
              Tire suas dúvidas pelo WhatsApp
            </Button>
          </div>

          <p data-animate="fade" className="mt-9 flex gap-3 border-t border-royal/10 pt-6 text-xs leading-relaxed text-royal/65">
            <Info className="mt-0.5 size-4 shrink-0 text-brown" aria-hidden="true" />
            As condições, os subsídios e a elegibilidade dependem das regras vigentes, da renda familiar, da análise de
            crédito e dos demais critérios aplicáveis.
          </p>
        </div>
      </div>
    </section>
  )
}
