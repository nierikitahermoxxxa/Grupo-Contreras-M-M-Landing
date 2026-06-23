import { useState, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'

function FAQItem({ q, a, isOpen, onClick, delay }) {
  const contentRef = useRef(null)

  return (
    <div
      className="reveal group rounded-xl border border-gray-200 dark:border-[#222] bg-white dark:bg-[#111111] overflow-hidden transition-all duration-300 hover:border-[#EFD49C]/50 dark:hover:border-[#EFD49C]/40"
      data-delay={delay}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`font-medium text-base transition-colors duration-200 ${
          isOpen ? 'text-[#EFD49C]' : 'text-gray-900 dark:text-white'
        }`}>
          {q}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-lg transition-all duration-300 ${
          isOpen
            ? 'border-[#EFD49C] bg-[#EFD49C] text-black rotate-45'
            : 'border-gray-300 dark:border-[#333] text-[#EFD49C]'
        }`}>
          +
        </span>
      </button>

      {/* Contenido con animación de altura */}
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 200}px` : '0px' }}
        className="overflow-hidden transition-all duration-400 ease-in-out"
      >
        <p className="px-6 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLang()
  const sectionRef = useReveal('reveal')
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative z-10 py-24 bg-gray-50 dark:bg-[#0D0D0D] transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="reveal text-center mb-14" data-delay="0">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#EFD49C]/60" />
            <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.faq.eyebrow}</span>
            <span className="w-8 h-px bg-[#EFD49C]/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {t.faq.title}
          </h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              delay={i * 80}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
