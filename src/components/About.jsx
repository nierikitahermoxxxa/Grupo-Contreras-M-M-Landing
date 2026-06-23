import studio from '../assets/studio.webp'
import { useReveal } from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'

export default function About() {
  const sectionRef = useReveal('reveal')
  const { t } = useLang()

  return (
    <section ref={sectionRef} id="nosotros" className="relative z-10 py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 mb-4" data-delay="0">
          <span className="w-8 h-px bg-[#EFD49C]" />
          <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.about.eyebrow}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: text */}
          <div>
            <h2 className="reveal text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-snug mb-6 transition-colors duration-300" data-delay="100">
              {t.about.title1} <span className="text-[#EFD49C]">{t.about.title1Gold}</span> <br />
              {t.about.title2} <span className="text-[#EFD49C]">{t.about.title2Gold}</span>.
            </h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
              <p className="reveal" data-delay="200">{t.about.p1}</p>
              <p className="reveal" data-delay="300">
                {t.about.p2pre}
                <strong className="text-gray-900 dark:text-white font-semibold">{t.about.founder1}</strong>
                {t.about.p2mid}
                <strong className="text-gray-900 dark:text-white font-semibold">{t.about.founder2}</strong>
                {t.about.p2post}
              </p>
              <p className="reveal" data-delay="400">{t.about.p3}</p>
            </div>
          </div>

          {/* Right: photo */}
          <div className="reveal relative" data-delay="150">
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={studio}
                alt="Nuestro estudio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-[#EFD49C]/20" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#EFD49C]/30 -z-10" />

            <div className="absolute bottom-6 left-6 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#EFD49C]/20 px-4 py-3 transition-colors duration-300">
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">{t.about.foundersLabel}</p>
              <p className="font-bold text-gray-900 dark:text-white text-sm mt-0.5 transition-colors duration-300">{t.about.founder1}</p>
              <p className="font-bold text-gray-900 dark:text-white text-sm transition-colors duration-300">{t.about.founder2}</p>
              <p className="text-[#EFD49C] text-xs mt-0.5">{t.about.since}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
