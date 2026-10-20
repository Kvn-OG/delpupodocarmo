import { useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import Hero from './sections/Hero'
import About from './sections/About'
import FeaturedProperties from './sections/FeaturedProperties'
import Services from './sections/Services'
import WhyChooseUs from './sections/WhyChooseUs'
import MinhaCasaMinhaVida from './sections/MinhaCasaMinhaVida'
import Testimonials from './sections/Testimonials'
import FinalCTA from './sections/FinalCTA'
import Contact from './sections/Contact'
import { useSiteMotion } from './hooks/useSiteMotion'

export default function App() {
  const mainRef = useRef(null)
  useSiteMotion(mainRef)

  return (
    <>
      <Header />
      <main id="conteudo" ref={mainRef} tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <FeaturedProperties />
        <Services />
        <WhyChooseUs />
        <MinhaCasaMinhaVida />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
