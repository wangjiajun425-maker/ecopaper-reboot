import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { Cart, Close, Menu } from './Icons.jsx'
import { useShop } from '../context/ShopContext.jsx'

const LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#x1', label: 'Impresora X1' },
  { href: '#ahorro', label: 'Calculadora' },
  { href: '#consumibles', label: 'Consumibles' },
  { href: '#planes', label: 'Planes' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const { count, setCartOpen, requestContact } = useShop()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled ? 'border-b border-ink/5 bg-paper/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Principal">
        <a href="#top" className="flex items-center gap-2.5" aria-label="EcoPaper Reboot, inicio">
          <Logo className="h-9 w-9" />
          <span className="font-display text-[15px] font-bold leading-none">
            EcoPaper <span className="text-eco-600">Reboot</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition hover:bg-ink/5 hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/80 transition hover:border-ink/25"
            aria-label={`Abrir carrito (${count} artículos)`}
          >
            <Cart />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-eco-600 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => requestContact('renting')} className="btn-eco hidden px-5 py-2.5 sm:inline-flex">
            Contratar Renting
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/80 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menú"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-ink/5 bg-paper/95 backdrop-blur-md lg:hidden">
          <ul className="container-x grid gap-1 py-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-medium hover:bg-ink/5">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => {
                  setOpen(false)
                  requestContact('renting')
                }}
                className="btn-eco w-full"
              >
                Contratar Renting Ecológico
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
