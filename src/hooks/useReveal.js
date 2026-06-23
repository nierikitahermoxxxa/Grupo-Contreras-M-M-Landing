import { useEffect, useRef } from 'react'

export function useReveal(className = 'reveal') {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const els = section.querySelectorAll(`.${className}`)

    const reveal = (el) => {
      const delay = Number(el.dataset.delay || 0)
      el.style.transitionDelay = `${delay}ms`
      // Estilos en línea: persisten aunque React re-renderice (cambio de idioma)
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [className])

  return sectionRef
}
