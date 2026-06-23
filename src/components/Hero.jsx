import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import studio from '../assets/studio3.jpg'
import { useLang } from '../i18n/LanguageContext'

export default function Hero({ dark }) {
  const innerRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      const p = Math.min(y / h, 1)
      if (innerRef.current) {
        innerRef.current.style.transform = `scale(${1 - p * 0.07})`
        innerRef.current.style.opacity = `${Math.max(1 - p * 1.4, 0)}`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="sticky top-0 h-screen flex flex-col lg:flex-row z-0 overflow-hidden"
    >
      <div
        ref={innerRef}
        className="flex flex-col lg:flex-row w-full h-full"
        style={{ willChange: 'transform, opacity', transformOrigin: 'center center' }}
      >

        {/* ── Panel izquierdo ── */}
        <div className={`relative flex flex-col justify-center lg:w-[52%] pt-20 lg:pt-0 overflow-hidden transition-colors duration-500 ${
          dark ? 'bg-[#0A0A0A]' : 'bg-white'
        }`}>

          {dark && (
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{
                backgroundImage: 'linear-gradient(#EFD49C 1px, transparent 1px), linear-gradient(90deg, #EFD49C 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          )}
          {dark && (
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#EFD49C]/8 rounded-full blur-[100px] pointer-events-none" />
          )}
          {!dark && (
            <div className="absolute top-0 right-0 w-px h-full bg-gray-100 hidden lg:block" />
          )}

          <div className="relative z-10 w-full max-w-lg mx-auto px-6 sm:px-10 lg:px-0 lg:ml-16 xl:ml-24">

            <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
              <div className="inline-block border border-[#EFD49C]/40 bg-black p-3">
                <img
                  src={logo}
                  alt="S. Contreras & Asociados M&M"
                  className="h-24 sm:h-28 lg:h-32 w-auto block"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 sm:w-8 h-px bg-[#EFD49C]/60 flex-shrink-0" />
              <span className="text-[#EFD49C] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
                {t.hero.eyebrow}
              </span>
              <span className="w-6 sm:w-8 h-px bg-[#EFD49C]/60 flex-shrink-0" />
            </div>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-[3.2rem] font-bold leading-[1.1] tracking-tight mb-5 transition-colors duration-300 ${
              dark ? 'text-white' : 'text-gray-900'
            }`}>
              {t.hero.title1} <span className="text-[#EFD49C]">{t.hero.title1Gold}</span>,<br />
              {t.hero.title2} <span className="text-[#EFD49C]">{t.hero.title2Gold}</span>.
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed mb-8 transition-colors duration-300 ${
              dark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-5 sm:gap-4">
              <Link
                to="/experiencia"
                className="btn-led inline-flex items-center gap-2 justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#EFD49C] text-black font-semibold text-xs sm:text-sm tracking-widest hover:bg-[#e0c07a] transition-colors w-full sm:w-auto"
              >
                {t.hero.button}
                <span>→</span>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-xl font-bold text-[#EFD49C] leading-none">100%</span>
                <p className={`text-[11px] sm:text-[10px] tracking-wide uppercase leading-tight transition-colors duration-300 ${
                  dark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {t.hero.commitment}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Panel derecho: foto ── */}
        <div className="relative lg:w-[48%] h-64 sm:h-80 lg:h-auto overflow-hidden">
          <img
            src={studio}
            alt="Estudio Contreras & Asociados"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {dark && (
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.2) 30%, transparent 65%)' }}
            />
          )}
          {dark && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          )}
        </div>

      </div>
    </section>
  )
}
