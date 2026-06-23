import { useReveal } from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'

const MAP_QUERY = 'Av. Montoya 121, Netzahualcoyotl, 68140 Oaxaca de Juárez, Oax.'
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&t=&z=16&ie=UTF8&iwloc=&output=embed`
const MAP_LINK = 'https://maps.app.goo.gl/Ye9g66VnFvvc6vkf9'

const PinIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const PhoneIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
  </svg>
)
const MailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const ClockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export default function Ubicacion() {
  const sectionRef = useReveal('reveal')
  const { t } = useLang()

  const info = [
    { icon: PinIcon, title: t.ubi.ubicacion, lines: ['Av. Montoya 121, Netzahualcoyotl', '68140 Oaxaca de Juárez, Oax.'] },
    { icon: PhoneIcon, title: t.ubi.whatsapp, lines: ['951 218 9735'] },
    { icon: MailIcon, title: t.ubi.correo, lines: ['solucionescontablesmym@gmail.com'] },
    { icon: ClockIcon, title: t.ubi.horario, lines: [t.ubi.horarioValue] },
  ]

  return (
    <section
      ref={sectionRef}
      id="ubicacion"
      className="relative z-10 py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-12" data-delay="0">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#EFD49C]" />
            <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.ubi.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {t.ubi.title}
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl transition-colors duration-300">
            {t.ubi.subtitle}
          </p>
        </div>

        {/* Info cards */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-[#2A2A2A] mb-10 transition-colors duration-300" data-delay="100">
          {info.map(item => (
            <div key={item.title} className="bg-white dark:bg-[#111111] p-6 transition-colors duration-300">
              <div className="w-11 h-11 border border-[#EFD49C]/40 flex items-center justify-center text-[#EFD49C] mb-4">
                {item.icon}
              </div>
              <h3 className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 transition-colors duration-300">{item.title}</h3>
              {item.lines.map(line => (
                <p key={line} className="text-gray-900 dark:text-white text-sm font-medium leading-relaxed transition-colors duration-300">{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Mapa grande */}
        <div className="reveal relative rounded-2xl overflow-hidden border border-gray-200 dark:border-[#2A2A2A] transition-colors duration-300" data-delay="200">
          <iframe
            title="Ubicación Contreras & Asociados"
            src={MAP_EMBED}
            width="100%"
            height="450"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="dark:brightness-90"
          />

          {/* Botón flotante para abrir en Google Maps */}
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-5 py-3 bg-[#EFD49C] text-black font-semibold text-sm tracking-wide hover:bg-[#e0c07a] transition-colors shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t.ubi.button}
          </a>
        </div>

      </div>
    </section>
  )
}
