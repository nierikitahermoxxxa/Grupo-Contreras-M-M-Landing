import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'

// Imágenes de referencia por fase (reemplazables por fotos reales de las obras)
const expImages = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',   // inicio de obra (varillas/estructura)
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=900&q=80', // obra en proceso (piso/acabados)
  'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80', // cubierta / techo
  'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=900&q=80', // camino / carretera
]

// Color del badge según el estado (por índice)
const statusColor = [
  'bg-blue-500/15 text-blue-400 border-blue-500/30',      // inicio
  'bg-amber-500/15 text-amber-400 border-amber-500/30',   // en proceso
  'bg-purple-500/15 text-purple-400 border-purple-500/30',// próxima entrega
  'bg-green-500/15 text-green-400 border-green-500/30',   // entregada
]

export default function Experiencia() {
  const { t } = useLang()
  const sectionRef = useReveal('reveal')
  const projects = t.exp.list
  const TOTAL = projects.length

  const [idx, setIdx] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)

  const go = useCallback((n) => {
    setIdx(((n % TOTAL) + TOTAL) % TOTAL)
    setAnimKey(k => k + 1)
  }, [TOTAL])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => go(idx + 1), 6000)
  }, [go, idx])

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % TOTAL), 6000)
    return () => clearInterval(timerRef.current)
  }, [TOTAL])

  const p = projects[idx]

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative z-10 py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12" data-delay="0">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#EFD49C]" />
              <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.exp.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {t.exp.title}
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl transition-colors duration-300">
              {t.exp.subtitle}
            </p>
          </div>

          {/* Flechas */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => { go(idx - 1); resetTimer() }}
              className="w-11 h-11 rounded-full border border-[#EFD49C]/40 text-[#EFD49C] flex items-center justify-center hover:bg-[#EFD49C] hover:text-black transition-all duration-200 text-lg"
              aria-label="Anterior"
            >←</button>
            <button
              onClick={() => { go(idx + 1); resetTimer() }}
              className="w-11 h-11 rounded-full border border-[#EFD49C]/40 text-[#EFD49C] flex items-center justify-center hover:bg-[#EFD49C] hover:text-black transition-all duration-200 text-lg"
              aria-label="Siguiente"
            >→</button>
          </div>
        </div>

        {/* Card grande dividida */}
        <div
          className="reveal grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 dark:border-[#1f1f1f] bg-gray-50 dark:bg-[#111111] transition-colors duration-300"
          data-delay="100"
          onMouseEnter={() => clearInterval(timerRef.current)}
          onMouseLeave={resetTimer}
        >
          {/* Izquierda: info */}
          <div key={`info-${animKey}`} className="slide-in-left flex flex-col justify-between p-8 sm:p-12 order-2 lg:order-1">
            <div>
              {/* Número + badge */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-[#EFD49C]/20 leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={`px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${statusColor[idx]}`}>
                  {p.status}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-5 transition-colors duration-300">
                {p.title}
              </h3>
              <div className="w-12 h-px bg-[#EFD49C] mb-6" />
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                {p.desc}
              </p>
            </div>

            {/* Dots + contador */}
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { go(i); resetTimer() }}
                    className={`h-1 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-[#EFD49C]' : 'w-4 bg-[#EFD49C]/30'}`}
                    aria-label={`Proyecto ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500">
                {String(idx + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Derecha: imagen */}
          <div className="relative min-h-[280px] lg:min-h-[440px] order-1 lg:order-2 overflow-hidden">
            <img
              key={`img-${animKey}`}
              src={expImages[idx]}
              alt={p.title}
              className="slide-in-right absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

      </div>
    </section>
  )
}
