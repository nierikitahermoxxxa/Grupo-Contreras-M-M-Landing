import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import MisionVision from '../components/MisionVision'
import Politicas from '../components/Politicas'
import Ubicacion from '../components/Ubicacion'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home({ dark, toggleTheme }) {
  return (
    <>
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      <Hero dark={dark} />
      <About />
      <Services />
      <MisionVision />
      <Politicas />
      <Ubicacion />
      <FAQ />
      <Contact />
      <Footer />
    </>
  )
}
