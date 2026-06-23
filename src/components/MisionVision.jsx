import { useReveal } from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'

export default function MisionVision() {
  const sectionRef = useReveal('reveal')
  const { t } = useLang()

  return (
    <section
      ref={sectionRef}
      id="mision-vision"
      className="relative z-10 py-24 bg-gray-50 dark:bg-[#0D0D0D] transition-colors duration-300 overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EFD49C]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EFD49C]/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 mb-14" data-delay="0">
          <span className="w-8 h-px bg-[#EFD49C]" />
          <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.mv.eyebrow}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-gray-200 dark:bg-[#2A2A2A] transition-colors duration-300">

          {/* ── Misión ── */}
          <div className="reveal bg-white dark:bg-[#111111] p-10 lg:p-14 relative overflow-hidden transition-colors duration-300" data-delay="100">
            {/* Número decorativo */}
            <span className="absolute -top-4 -right-2 text-[160px] font-black text-[#EFD49C]/5 leading-none select-none pointer-events-none">
              01
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 border border-[#EFD49C]/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#EFD49C] text-lg">◈</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
                  {t.mv.misionTitle}
                </h2>
              </div>

              <div className="w-12 h-px bg-[#EFD49C] mb-8" />

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg transition-colors duration-300">
                {t.mv.mision}
              </p>

              <div className="mt-10 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#EFD49C] rounded-full" />
                <span className="text-[#EFD49C] text-xs font-semibold tracking-widest uppercase">{t.mv.misionTag}</span>
              </div>
            </div>
          </div>

          {/* ── Visión ── */}
          <div className="reveal bg-white dark:bg-[#111111] p-10 lg:p-14 relative overflow-hidden transition-colors duration-300" data-delay="200">
            {/* Número decorativo */}
            <span className="absolute -top-4 -right-2 text-[160px] font-black text-[#EFD49C]/5 leading-none select-none pointer-events-none">
              02
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 border border-[#EFD49C]/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#EFD49C] text-lg">◉</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
                  {t.mv.visionTitle}
                </h2>
              </div>

              <div className="w-12 h-px bg-[#EFD49C] mb-8" />

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg transition-colors duration-300">
                {t.mv.vision}
              </p>

              <div className="mt-10 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#EFD49C] rounded-full" />
                <span className="text-[#EFD49C] text-xs font-semibold tracking-widest uppercase">{t.mv.visionTag}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
