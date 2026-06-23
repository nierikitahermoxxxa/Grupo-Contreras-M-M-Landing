import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'

// Ícono de libro para la lluvia decorativa
const BookIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

// Configuración de los libros que caen (lado derecho)
const books = [
  { right: '4%',  size: 22, dur: '7s',  delay: '0s',   dist: '560px' },
  { right: '9%',  size: 30, dur: '9s',  delay: '1.5s', dist: '560px' },
  { right: '14%', size: 18, dur: '6.5s',delay: '3s',   dist: '560px' },
  { right: '6%',  size: 26, dur: '8s',  delay: '4.5s', dist: '560px' },
  { right: '12%', size: 20, dur: '7.5s',delay: '2.2s', dist: '560px' },
]

// Íconos para cada política (calidad, precios, seguridad)
const icons = [
  // Calidad — escudo con check
  <svg key="q" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // Precios — etiqueta / billete
  <svg key="p" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
  // Seguridad — casco
  <svg key="s" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1a7 7 0 0 0-7-7H9a7 7 0 0 0-7 7z" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <path d="M4 15h16" />
  </svg>,
]

export default function Politicas() {
  const sectionRef = useReveal('reveal')
  const { t } = useLang()
  const [spot, setSpot] = useState({ x: -500, y: -500, active: false })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true })
  }

  return (
    <section
      ref={sectionRef}
      id="politicas"
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot(s => ({ ...s, active: false }))}
      className="relative z-10 py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300 overflow-hidden"
    >
      {/* Fondo animado: blobs dorados + grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-1 absolute top-0 left-0 w-[460px] h-[460px] bg-[#EFD49C]/30 dark:bg-[#EFD49C]/20 rounded-full blur-[90px]" />
        <div className="blob-2 absolute bottom-0 right-0 w-[420px] h-[420px] bg-[#EFD49C]/25 dark:bg-[#EFD49C]/15 rounded-full blur-[80px]" />
        <div className="blob-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#EFD49C]/20 dark:bg-[#EFD49C]/12 rounded-full blur-[70px]" />
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
          style={{
            backgroundImage: 'linear-gradient(#EFD49C 1px, transparent 1px), linear-gradient(90deg, #EFD49C 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Spotlight que sigue el cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${spot.x}px ${spot.y}px, rgba(239,212,156,0.18), transparent 70%)`,
        }}
      />

      {/* Libros cayendo del lado derecho */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-[#EFD49C]/40 dark:text-[#EFD49C]/30">
        {books.map((b, i) => (
          <span
            key={i}
            className="falling-book absolute top-0"
            style={{ right: b.right, '--fall-dur': b.dur, '--fall-delay': b.delay, '--fall-dist': b.dist }}
          >
            <BookIcon size={b.size} />
          </span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-14" data-delay="0">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#EFD49C]/60" />
            <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.politicas.eyebrow}</span>
            <span className="w-8 h-px bg-[#EFD49C]/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {t.politicas.title}
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {t.politicas.subtitle}
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.politicas.list.map((pol, i) => (
            <div
              key={i}
              className="reveal group relative flex flex-col rounded-2xl border border-gray-200 dark:border-[#222] bg-gray-50/80 dark:bg-[#111111]/80 backdrop-blur-sm p-8 hover:border-[#EFD49C]/50 dark:hover:border-[#EFD49C]/40 hover:shadow-xl hover:shadow-[#EFD49C]/5 transition-all duration-300"
              data-delay={i * 100}
            >
              {/* Ícono */}
              <div className="w-12 h-12 rounded-xl border border-[#EFD49C]/30 bg-[#EFD49C]/5 flex items-center justify-center text-[#EFD49C] mb-6">
                {icons[i]}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug transition-colors duration-300">
                {pol.title}
              </h3>
              <div className="w-10 h-px bg-[#EFD49C] mb-5" />
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                {pol.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
