import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'

const WHATSAPP_NUMBER = '5219511314538' // 52 (MX) + 1 + número
const EMAIL = 'grupocontrerasoficial@gmail.com'

// 👉 Pega aquí tu Access Key de https://web3forms.com (gratis con tu correo)
const WEB3FORMS_KEY = 'TU_ACCESS_KEY_AQUI'

export default function Contact() {
  const { t } = useLang()
  const sectionRef = useReveal('reveal')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', otherService: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const serviceOptions = [...t.services.list.map(s => s.title), t.contact.serviceOther]

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    const servicio = form.service === t.contact.serviceOther ? form.otherService : form.service
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nueva solicitud de ${form.name} — Grupo Contreras`,
          from_name: 'Sitio web Grupo Contreras',
          Nombre: form.name,
          Correo: form.email,
          Teléfono: form.phone || 'No proporcionado',
          Servicio: servicio || 'No especificado',
          Mensaje: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name: '', email: '', phone: '', service: '', otherService: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // Input estilo línea inferior (Kiwi Code)
  const fieldClass = "w-full bg-transparent border-0 border-b border-gray-300 dark:border-[#333] py-2.5 text-gray-900 dark:text-white text-sm outline-none focus:border-[#EFD49C] transition-colors duration-200 placeholder-gray-400 dark:placeholder-gray-600"
  const labelClass = "block text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-[0.15em] transition-colors duration-300"

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative z-10 overflow-hidden bg-white dark:bg-[#0A0A0A] transition-colors duration-300"
    >
      {/* Fondo de puntos tipo mapa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          color: 'rgba(239,212,156,0.12)',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black 30%, transparent 75%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">

        {/* Título centrado */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16" data-delay="0">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#EFD49C]/60" />
            <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">{t.contact.eyebrow}</span>
            <span className="w-8 h-px bg-[#EFD49C]/60" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.05] tracking-tight transition-colors duration-300">
            {t.contact.bigTitle1}<br />
            <span className="text-[#EFD49C]">{t.contact.bigTitle2}</span>
          </h2>
          <p className="mt-5 text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {t.contact.bigSubtitle}
          </p>
        </div>

        {/* Dos columnas con divisor */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 border border-gray-200 dark:border-[#1f1f1f] rounded-2xl overflow-hidden bg-white/40 dark:bg-[#0d0d0d]/40 backdrop-blur-sm transition-colors duration-300">

          {/* Izquierda: puntos de confianza */}
          <div className="reveal flex flex-col justify-between p-8 sm:p-12 lg:border-r border-gray-200 dark:border-[#1f1f1f]" data-delay="100">
            <div className="space-y-8">
              {t.contact.points.map((p, i) => (
                <div key={p.title} className="flex gap-5">
                  <span className="text-[#EFD49C] text-sm font-bold tracking-widest pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-1 transition-colors duration-300">{p.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer izquierdo */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#1f1f1f]">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] mb-3">{t.contact.respondsIn}</p>
              <div className="flex flex-col gap-1.5 text-sm">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-[#EFD49C] transition-colors">💬 951 131 4538</a>
                <a href={`mailto:${EMAIL}`} className="text-gray-700 dark:text-gray-300 hover:text-[#EFD49C] transition-colors break-all">✉️ {EMAIL}</a>
                <span className="text-gray-500 dark:text-gray-500">📍 {t.contact.location}</span>
              </div>
            </div>
          </div>

          {/* Derecha: formulario minimalista */}
          <div className="reveal p-8 sm:p-12" data-delay="200">
            {status === 'sent' ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 border border-[#EFD49C]/40 flex items-center justify-center text-[#EFD49C] text-2xl mx-auto mb-4">✓</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{t.contact.sentTitle}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">{t.contact.sentText}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-[#EFD49C] text-sm hover:underline">
                  {t.contact.sentAgain}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{t.contact.name} *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t.contact.phone}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={fieldClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t.contact.email} *</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} className={fieldClass} placeholder="correo@ejemplo.com" />
                </div>

                <div>
                  <label className={labelClass}>{t.contact.service}</label>
                  <select name="service" value={form.service} onChange={handleChange} className={`${fieldClass} cursor-pointer`}>
                    <option value="" className="bg-white dark:bg-[#111]">{t.contact.selectService}</option>
                    {serviceOptions.map(s => <option key={s} className="bg-white dark:bg-[#111]">{s}</option>)}
                  </select>
                </div>

                {form.service === t.contact.serviceOther && (
                  <div>
                    <label className={labelClass}>{t.contact.otherLabel} *</label>
                    <input type="text" name="otherService" required value={form.otherService} onChange={handleChange} className={fieldClass} placeholder={t.contact.otherPlaceholder} />
                  </div>
                )}

                <div>
                  <label className={labelClass}>{t.contact.message} *</label>
                  <textarea name="message" required rows={3} value={form.message} onChange={handleChange} className={`${fieldClass} resize-none`} placeholder={t.contact.messagePlaceholder} />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">{t.contact.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#EFD49C] text-black font-semibold text-sm tracking-wide hover:bg-[#e0c07a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t.contact.sending : (
                    <>
                      <span>↓</span>
                      {t.contact.send}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
