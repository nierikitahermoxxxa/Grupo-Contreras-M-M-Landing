import { useState, useEffect } from 'react'
import logo from '../assets/logo.jpg'

export default function Splash({ onDone }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),   // logo aparece
      setTimeout(() => setStep(2), 1400),  // rectángulo dorado expande
      setTimeout(() => setStep(3), 2600),  // splash sube
      setTimeout(onDone, 3300),            // desmonta
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0A0A0A',
        overflow: 'hidden',
        transform: step >= 3 ? 'translateY(-100%)' : 'translateY(0)',
        transition: step >= 3 ? 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      {/* Rectángulo dorado que expande desde el centro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#EFD49C',
          clipPath: step >= 2
            ? 'inset(0% 0% 0% 0%)'
            : 'inset(44% 38% 44% 38%)',
          transition: step >= 2
            ? 'clip-path 1s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
        }}
      />

      {/* Grid sutil encima del dorado */}
      {step >= 2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Logo centrado */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: step >= 1 ? 1 : 0,
          transition: 'opacity 0.8s ease',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <img
          src={logo}
          alt="S. Contreras & Asociados M&M"
          style={{
            height: '180px',
            width: 'auto',
            display: 'block',
            filter: step >= 2 ? 'invert(1)' : 'none',
            transition: 'filter 0.4s ease',
          }}
        />
        {/* Líneas decorativas + texto eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '16px',
            justifyContent: 'center',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: step >= 2 ? '#0A0A0A' : '#EFD49C', opacity: 0.6, transition: 'background 0.4s ease' }} />
          <span style={{
            color: step >= 2 ? '#0A0A0A' : '#EFD49C',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            fontFamily: 'Inter, system-ui, sans-serif',
            transition: 'color 0.4s ease',
          }}>
            CONSTRUCCIÓN · CONSULTORÍA
          </span>
          <span style={{ width: '32px', height: '1px', background: step >= 2 ? '#0A0A0A' : '#EFD49C', opacity: 0.6, transition: 'background 0.4s ease' }} />
        </div>
      </div>
    </div>
  )
}
