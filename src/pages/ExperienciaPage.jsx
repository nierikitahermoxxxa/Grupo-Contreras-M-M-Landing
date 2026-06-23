import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLang } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import proyecto1 from '../assets/proyectos/proyecto1.png'
import proyecto2 from '../assets/proyectos/proyecto2.png'
import proyecto3 from '../assets/proyectos/proyecto3.png'
import proyecto4 from '../assets/proyectos/proyecto4.png'

const expImages = [proyecto1, proyecto2, proyecto3, proyecto4]

const statusColor = [
  'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'bg-green-500/15 text-green-400 border-green-500/30',
]

export default function ExperienciaPage({ dark, toggleTheme }) {
  const { t } = useLang()
  const sectionRef = useReveal('reveal')
  const projects = t.exp.list
  const backLabel = t.nav.inicio

  return (
    <>
      <Navbar dark={dark} toggleTheme={toggleTheme} />

      <main ref={sectionRef} className="bg-white dark:bg-[#0A0A0A] transition-colors duration-300">

        {/* Hero de la página */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              color: 'rgba(239,212,156,0.10)',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 70%)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#EFD49C] dark:hover:text-[#EFD49C] transition-colors mb-8">
              ← {backLabel}
            </Link>
            <div className="reveal" data-delay="0">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#EFD49C]" />
                <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.exp.eyebrow}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.05] tracking-tight transition-colors duration-300 max-w-3xl">
                {t.exp.title}
              </h1>
              <p className="mt-5 text-gray-500 dark:text-gray-400 max-w-xl transition-colors duration-300">
                {t.exp.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Proyectos alternados */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`reveal grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              data-delay="0"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group [direction:ltr]">
                <img
                  src={expImages[i]}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 text-6xl font-black text-white/30 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Texto */}
              <div className="[direction:ltr]">
                <span className={`inline-block px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase mb-5 ${statusColor[i]}`}>
                  {p.status}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-5 transition-colors duration-300">
                  {p.title}
                </h2>
                <div className="w-12 h-px bg-[#EFD49C] mb-6" />
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA final */}
        <section className="border-t border-gray-200 dark:border-[#1f1f1f] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              {t.contact.bigTitle1} {t.contact.bigTitle2}
            </h2>
            <Link
              to="/#contacto"
              className="btn-led inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#EFD49C] text-black font-semibold text-sm tracking-wide hover:bg-[#e0c07a] transition-colors"
            >
              {t.nav.cta}
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
