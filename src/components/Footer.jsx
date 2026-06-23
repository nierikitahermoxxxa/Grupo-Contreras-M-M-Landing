import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="relative z-10 bg-[#0A0A0A] border-t border-[#EFD49C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand */}
        <div className="max-w-md">
          <p className="text-[#EFD49C] font-bold text-lg leading-tight">
            Grupo Contreras y Asociados
          </p>
          <p className="text-gray-500 text-xs mt-1 tracking-wider">M&M Construcción y Consultoría</p>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <p>© {new Date().getFullYear()} Grupo Contreras y Asociados M&M. {t.footer.rights}</p>
          <a href="/#inicio" className="text-[#EFD49C] hover:underline">{t.footer.backTop}</a>
        </div>
      </div>
    </footer>
  )
}
