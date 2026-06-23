import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logoIcon from '../assets/logo-icon.jpg'
import { useLang } from '../i18n/LanguageContext'

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/grupo_contreras.oficial/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Grupo-Contreras-y-Asociados-Oficial/61565342836795/', Icon: FacebookIcon },
]

export default function Navbar({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const { lang, toggleLang, t } = useLang()

  const links = [
    { label: t.nav.inicio, href: '/#inicio' },
    { label: t.nav.servicios, href: '/#servicios' },
    { label: t.nav.experiencia, to: '/experiencia' },
    { label: t.nav.nosotros, href: '/#nosotros' },
    { label: t.nav.misionVision, href: '/#mision-vision' },
    { label: t.nav.politicas, href: '/#politicas' },
    { label: t.nav.faq, href: '/#faq' },
    { label: t.nav.contacto, href: '/#contacto' },
  ]

  // Renderiza Link (ruta interna) o <a> (ancla de sección)
  const renderLink = (l, className, onClick) =>
    l.to
      ? <Link key={l.label} to={l.to} onClick={onClick} className={className}>{l.label}</Link>
      : <a key={l.label} href={l.href} onClick={onClick} className={className}>{l.label}</a>

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0A0A0A] dark:backdrop-blur-sm border-b border-gray-200 dark:border-[#EFD49C]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoIcon}
              alt="Contreras & Asociados M&M"
              className={`h-14 w-auto ${dark ? 'invert' : ''}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {links.map(l => renderLink(
              l,
              'whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#EFD49C] dark:hover:text-[#EFD49C] transition-colors'
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Redes sociales */}
            <div className="hidden sm:flex items-center gap-1 mr-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#EFD49C] dark:hover:text-[#EFD49C] hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-gray-600 dark:text-gray-300 hover:text-[#EFD49C] dark:hover:text-[#EFD49C] hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
              aria-label="Cambiar idioma"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Theme toggle */}
            <button
              onClick={(e) => toggleTheme(e.currentTarget)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
              aria-label="Cambiar tema"
            >
              {dark
                ? <SunIcon className="w-5 h-5 text-[#EFD49C]" />
                : <MoonIcon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* CTA */}
            <a
              href="/#contacto"
              className="hidden xl:inline-flex items-center px-4 py-2 rounded-full bg-[#EFD49C] text-black text-sm font-semibold hover:bg-[#e0c07a] transition-colors"
            >
              {t.nav.cta}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
            >
              {open
                ? <XMarkIcon className="w-6 h-6" />
                : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-[#EFD49C]/10 px-4 py-4 flex flex-col gap-4">
          {links.map(l => renderLink(
            l,
            'text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#EFD49C] transition-colors py-1',
            () => setOpen(false)
          ))}
          <a
            href="/#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex justify-center px-4 py-2 rounded-full bg-[#EFD49C] text-black text-sm font-semibold hover:bg-[#e0c07a] transition-colors"
          >
            {t.nav.cta}
          </a>

          {/* Redes sociales móvil */}
          <div className="flex items-center gap-4 pt-3 mt-1 border-t border-gray-200 dark:border-[#EFD49C]/10">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-600 dark:text-gray-300 hover:text-[#EFD49C] transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
