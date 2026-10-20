import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { LAST_UPDATE, legalPages } from '../data/legal'
import { legalLinks } from '../data/site'
import { useSiteMotion } from '../hooks/useSiteMotion'

export default function LegalPage({ kind }) {
  const page = legalPages[kind] ?? legalPages.privacidade
  const mainRef = useRef(null)
  useSiteMotion(mainRef)

  return (
    <>
      <Header onHome={false} />
      <main id="conteudo" ref={mainRef} tabIndex={-1} className="surface-light outline-none">
        <div className="bg-royal pt-36 pb-16 text-white lg:pt-44 lg:pb-20">
          <div className="container-site">
            <a href="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para o início
            </a>
            <h1 className="heading-xl mt-8 text-white">{page.title}</h1>
            <p className="mt-6 text-sm text-white/60">Última atualização: {LAST_UPDATE}</p>
          </div>
        </div>

        <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <article className="lg:col-span-8">
            <p className="text-lead text-royal/80">{page.intro}</p>
            {page.sections.map((section) => (
              <section key={section.title} className="mt-12 border-t border-sand pt-10">
                <h2 className="heading-md text-royal">{section.title}</h2>
                <div className="mt-5 space-y-4 text-royal/75">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <aside className="lg:col-span-3 lg:col-start-10">
            <nav aria-label="Documentos institucionais" className="lg:sticky lg:top-28">
              <p className="eyebrow text-brown">Documentos</p>
              <ul className="mt-5 space-y-3">
                {legalLinks.map((link) => {
                  const current = link.href.includes(kind === 'termos' ? 'termos' : 'privacidade')
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={current ? 'page' : undefined}
                        className="text-royal/75 underline-offset-4 hover:text-royal hover:underline aria-[current=page]:font-medium aria-[current=page]:text-royal"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </main>
      <Footer onHome={false} />
    </>
  )
}
