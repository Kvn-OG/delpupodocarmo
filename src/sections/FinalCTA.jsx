import Button from '../components/Button'
import LoopVideo from '../components/LoopVideo'
import { WhatsAppIcon } from '../components/icons'
import { whatsappLink } from '../lib/whatsapp'

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-final-title" className="py-10 sm:py-16">
      <div className="frame grain relative isolate overflow-hidden bg-royal text-white">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <LoopVideo className="size-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,43,35,0.55)_0%,rgba(21,43,35,0.85)_75%)]" />
        </div>

        <div className="container-site py-24 text-center sm:py-28 lg:py-36">
          <img src="/favicon.svg" alt="" aria-hidden="true" width="30" height="64" data-animate="fade" className="mx-auto h-16 w-auto" />
          <h2 id="cta-final-title" data-animate="fade" className="mx-auto mt-9 max-w-[20ch] text-[clamp(2.2rem,1.2rem+4vw,4.6rem)] leading-[1.04]">
            O próximo endereço da sua história pode estar mais perto do que você imagina.
          </h2>
          <div data-animate="fade" className="mx-auto mt-7 max-w-2xl space-y-3 text-white/80">
            <p>
              Não importa se você está começando a procurar seu primeiro imóvel, pensando em mudar de casa, querendo
              vender ou planejando investir.
            </p>
            <p>
              Conte para nós o que você procura. Vamos conversar, entender seus objetivos e ajudar você a conhecer as
              oportunidades disponíveis.
            </p>
          </div>
          <div data-animate="fade" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={whatsappLink('geral')} external variant="gold" leadingIcon={WhatsAppIcon}>
              Fale com a gente pelo WhatsApp
            </Button>
            <Button href="#imoveis" variant="glass">
              Conheça nossos imóveis
            </Button>
          </div>
          <p data-animate="fade" className="mt-14 font-sans text-[0.95rem] tracking-[0.06em] text-gold">
            Delpupo do Carmo — transformando sonhos em endereços.
          </p>
        </div>
      </div>
    </section>
  )
}
