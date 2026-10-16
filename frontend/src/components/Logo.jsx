/**
 * Logotipo EcoPaper Reboot: dos flechas verdes en bucle de reciclaje que abrazan
 * una hoja en blanco saliendo de una ranura de impresión azul tecnológico.
 * Para sustituir por el logo definitivo, reemplaza este SVG (o usa /public/logo.svg).
 */
export default function Logo({ className = 'h-10 w-10', animated = false, title = 'EcoPaper Reboot' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="epr-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#47b77c" />
          <stop offset="1" stopColor="#187d4c" />
        </linearGradient>
        <linearGradient id="epr-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#337dfc" />
          <stop offset="1" stopColor="#1549d6" />
        </linearGradient>
      </defs>

      {/* Bucle de reciclaje */}
      <g className={animated ? 'origin-center animate-spinslow' : undefined} style={{ transformBox: 'fill-box' }}>
        <path d="M6.89 38.73 A26 26 0 0 1 50.38 13.62" fill="none" stroke="url(#epr-green)" strokeWidth="5" strokeLinecap="round" />
        <polygon points="53.92,17.16 52.85,9.73 46.49,16.09" fill="#187d4c" />
        <path d="M57.11 25.27 A26 26 0 0 1 13.62 50.38" fill="none" stroke="url(#epr-green)" strokeWidth="5" strokeLinecap="round" />
        <polygon points="10.08,46.84 11.15,54.27 17.51,47.91" fill="#47b77c" />
      </g>

      {/* Cuerpo de impresora con ranura */}
      <rect x="17" y="34" width="30" height="12" rx="3" fill="url(#epr-blue)" />

      {/* Hoja en blanco saliendo de la ranura */}
      <g className={animated ? 'animate-feed' : undefined}>
        <path d="M23 14 H36 L41 19 V38.5 H23 Z" fill="#ffffff" stroke="#c9d3cf" strokeWidth="1" strokeLinejoin="round" />
        <path d="M36 14 V19 H41" fill="#eef2f0" stroke="#c9d3cf" strokeWidth="1" strokeLinejoin="round" />
      </g>

      {/* Ranura */}
      <rect x="20.5" y="37.5" width="23" height="2.6" rx="1.3" fill="#0f1f45" />
      <circle cx="42.5" cy="43" r="1.1" fill="#7fd2a3" />
    </svg>
  )
}
