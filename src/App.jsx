import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Splash from './components/Splash'
import Home from './pages/Home'
import ExperienciaPage from './pages/ExperienciaPage'
import './index.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashSeen'))

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleTheme = (buttonEl) => {
    const rect = buttonEl.getBoundingClientRect()
    const x = Math.round(rect.left + rect.width / 2)
    const y = Math.round(rect.top + rect.height / 2)
    const newDark = !dark
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    document.documentElement.style.setProperty('--vt-x', `${x}px`)
    document.documentElement.style.setProperty('--vt-y', `${y}px`)
    document.documentElement.style.setProperty('--vt-r', `${endRadius}px`)
    if (!document.startViewTransition) {
      setDark(newDark)
      return
    }
    document.startViewTransition(() => setDark(newDark))
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {showSplash && (
          <Splash onDone={() => {
            sessionStorage.setItem('splashSeen', '1')
            setShowSplash(false)
          }} />
        )}
        <Routes>
          <Route path="/" element={<Home dark={dark} toggleTheme={toggleTheme} />} />
          <Route path="/experiencia" element={<ExperienciaPage dark={dark} toggleTheme={toggleTheme} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
