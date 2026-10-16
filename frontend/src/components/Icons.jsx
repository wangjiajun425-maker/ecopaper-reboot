// Iconos de trazo (24px) para no depender de librerías externas.
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
const Svg = ({ className = 'h-5 w-5', children }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    {children}
  </svg>
)

export const Cart = (p) => <Svg {...p}><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" /><circle cx="9.5" cy="20" r="1" /><circle cx="17.5" cy="20" r="1" /></Svg>
export const Menu = (p) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
export const Close = (p) => <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
export const Check = (p) => <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>
export const Arrow = (p) => <Svg {...p}><path d="M5 12h14m-5-5 5 5-5 5" /></Svg>
export const Plus = (p) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
export const Minus = (p) => <Svg {...p}><path d="M5 12h14" /></Svg>
export const Pin = (p) => <Svg {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Svg>
export const Leaf = (p) => <Svg {...p}><path d="M5 19c8 0 14-6 14-14-8 0-14 4-14 11v3Zm0 0 7-7" /></Svg>
export const Bolt = (p) => <Svg {...p}><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" /></Svg>
export const Wifi = (p) => <Svg {...p}><path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.8 16a5 5 0 0 1 6.4 0" /><circle cx="12" cy="19.5" r=".8" /></Svg>
export const Gauge = (p) => <Svg {...p}><path d="M4 17a8 8 0 1 1 16 0" /><path d="m12 17 4-5" /></Svg>
export const Cycle = (p) => <Svg {...p}><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8m0-4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16m0 4v-4h-4" /></Svg>
export const Layers = (p) => <Svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></Svg>
export const Shield = (p) => <Svg {...p}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m9 12 2 2 4-4" /></Svg>
export const Eye = (p) => <Svg {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></Svg>
export const Spark = (p) => <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></Svg>
export const Mail = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></Svg>
