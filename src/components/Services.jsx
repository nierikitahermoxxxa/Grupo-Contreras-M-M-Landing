import { useState, useEffect, useRef, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'

const serviceImages = [
  'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=700&q=80',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80',
]

const VISIBLE = 3

function ServiceCard({ service, isFirst }) {
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none h-[500px] cursor-pointer transition-colors duration-300">

      {/* Imagen — se expande al hover igual que Raccoons */}
      <div className="relative overflow-hidden h-48 group-hover:h-72 transition-all duration-500 ease-in-out flex-shrink-0">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />
        {/* Número sobre la imagen */}
        <span className="absolute top-4 left-5 text-white/80 text-xs font-bold tracking-[0.3em]">
          {service.num}
        </span>
      </div>

      {/* Contenido */}
      <div className={`flex flex-col flex-1 p-6 border-l-4 transition-colors duration-300 ${
        isFirst ? 'border-[#EFD49C]' : 'border-[#EFD49C]/20 group-hover:border-[#EFD49C]/60'
      }`}>
        <h3 className="uppercase font-bold text-gray-900 dark:text-white text-sm leading-snug mb-3 tracking-wider transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 transition-colors duration-300">
          {service.desc}
        </p>
        <ul className="space-y-2.5 mt-auto">
          {service.items.map(item => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EFD49C] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useReveal('reveal')
  const { t } = useLang()
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('right')
  const [animKey, setAnimKey] = useState(0)
  const timerRef = useRef(null)

  const services = t.services.list.map((s, i) => ({
    ...s,
    num: String(i + 1).padStart(2, '0'),
    image: serviceImages[i],
  }))
  const TOTAL = services.length
  const maxIdx = TOTAL - VISIBLE

  const goNext = useCallback(() => {
    setDir('right')
    setIdx(i => (i >= maxIdx ? 0 : i + 1))
    setAnimKey(k => k + 1)
  }, [maxIdx])

  const goPrev = useCallback(() => {
    setDir('left')
    setIdx(i => (i <= 0 ? maxIdx : i - 1))
    setAnimKey(k => k + 1)
  }, [maxIdx])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(goNext, 5000)
  }

  useEffect(() => {
    timerRef.current = setInterval(goNext, 5000)
    return () => clearInterval(timerRef.current)
  }, [goNext])

  const handleNext = () => { resetTimer(); goNext() }
  const handlePrev = () => { resetTimer(); goPrev() }

  const displayed = Array.from({ length: VISIBLE }, (_, i) =>
    services[(idx + i) % TOTAL]
  )

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative z-10 py-24 bg-white dark:bg-[#0D0D0D] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-12" data-delay="0">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#EFD49C]" />
            <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.services.eyebrow}</span>
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {t.services.title}
              </h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl transition-colors duration-300">
                {t.services.subtitle}
              </p>
            </div>

            {/* Flechas */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-[#EFD49C]/40 text-[#EFD49C] flex items-center justify-center hover:bg-[#EFD49C] hover:text-black transition-all duration-200 text-lg"
                aria-label="Anterior"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-[#EFD49C]/40 text-[#EFD49C] flex items-center justify-center hover:bg-[#EFD49C] hover:text-black transition-all duration-200 text-lg"
                aria-label="Siguiente"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Carousel — pausa al hover */}
        <div
          onMouseEnter={() => clearInterval(timerRef.current)}
          onMouseLeave={() => { timerRef.current = setInterval(goNext, 5000) }}
        >
        <div
          key={animKey}
          className={`reveal grid grid-cols-1 md:grid-cols-3 gap-5 ${dir === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
          data-delay="100"
        >
          {displayed.map((s, i) => (
            <ServiceCard key={`${s.num}-${animKey}`} service={s} isFirst={i === 0} />
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIdx + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 'right' : 'left')
                setIdx(i)
                setAnimKey(k => k + 1)
                resetTimer()
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === idx ? 'bg-[#EFD49C] w-8' : 'bg-[#EFD49C]/30 w-6'
              }`}
            />
          ))}
        </div>
        </div>{/* cierra wrapper mouse */}

      </div>
    </section>
  )
}
