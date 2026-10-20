import Button from '../components/Button'
import { WhatsAppIcon } from '../components/icons'
import { whatsappLink } from '../lib/whatsapp'

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-final-title" className="grain relative isolate overflow-hidden bg-royal text-white">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/media/hero-loop-poster.webp"
          alt=""
          loading="lazy"
          className="size-full object-cover opacity-50 [filter:brightness(0.45)_saturate(0.5)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--color-royal)_75%)]" />
      </div>

      <div className="container-site py-28 text-center sm:py-32 lg:py-40">
        <img
          src="/favicon.svg"
          alt=""
          aria-hidden="true"
          width="34"
          height="72"
          data-animate="fade"
          className="mx-auto h-[4.5rem] w-auto"
        />
        <h2 id="cta-final-title" data-animate="fade" className="heading-xl mx-auto mt-10 max-w-[22ch] text-white">
          O próximo endereço da sua história pode estar mais perto do que você imagina.
        </h2>
        <div data-animate="fade" className="text-lead mx-auto mt-8 max-w-2xl space-y-4 text-white/75">
          <p>
            Não importa se você está começando a procurar seu primeiro imóvel, pensando em mudar de casa, querendo
            vender ou planejando investir.
          </p>
          <p>
            Conte para nós o que você procura. Vamos conversar, entender seus objetivos e ajudar você a conhecer as
            oportunidades disponíveis.
          </p>
        </div>

        <div data-animate="fade" className="mt-11 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={whatsappLink('geral')} external icon={WhatsAppIcon} iconPosition="start" className="sm:min-h-14 sm:px-8">
            Fale com a gente pelo WhatsApp
          </Button>
          <Button href="#imoveis" variant="outlineLight" className="sm:min-h-14 sm:px-8">
            Conheça nossos imóveis
          </Button>
        </div>

        <div data-animate="line" className="mx-auto mt-16 h-px max-w-md bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p data-animate="fade" className="mt-6 font-slogan text-[0.95rem] tracking-[0.06em] text-gold">
          Delpupo do Carmo — transformando sonhos em endereços.
        </p>
      </div>
    </section>
  )
}
