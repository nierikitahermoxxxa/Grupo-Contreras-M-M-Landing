const testimonials = [
  {
    name: 'Ing. Roberto Mendoza',
    role: 'Presidente Municipal, Municipio de San Rafael',
    text: 'Grupo Contreras ejecutó la pavimentación de 3 km de calles en tiempo récord y con una calidad que superó nuestras expectativas. Excelente equipo de trabajo.',
    stars: 5,
  },
  {
    name: 'Arq. Laura Vásquez',
    role: 'Desarrolladora inmobiliaria',
    text: 'Construyeron dos casas habitación para nuestro proyecto residencial. El nivel de detalle y el cumplimiento de plazos fue impecable. Definitivamente los recomendamos.',
    stars: 5,
  },
  {
    name: 'C.P. Héctor Flores',
    role: 'Director de Obras Públicas',
    text: 'Su asesoría técnica municipal nos permitió optimizar el manejo de recursos y tener un mejor control contable en nuestros proyectos de infraestructura.',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonios" className="relative z-10 py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#EFD49C]" />
            <span className="text-[#EFD49C] text-xs font-semibold tracking-[0.2em] uppercase">Testimonios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            Lo que dicen de nosotros.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 dark:bg-[#2A2A2A] transition-colors duration-300">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-[#111111] p-7 transition-colors duration-300"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-[#EFD49C]">★</span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 transition-colors duration-300">
                "{t.text}"
              </p>
              <div className="pt-5 border-t border-gray-100 dark:border-[#2A2A2A] transition-colors duration-300">
                <p className="font-semibold text-gray-900 dark:text-white text-sm transition-colors duration-300">{t.name}</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 transition-colors duration-300">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
