import Logo from './Logo.jsx'
import { Arrow, Cart } from './Icons.jsx'
import { formatEUR } from '../lib/api.js'
import { useShop } from '../context/ShopContext.jsx'

const AUDIENCE = ['Oficinas corporativas', 'Notarías', 'Despachos de abogados', 'Academias', 'Administraciones públicas', 'Universitarios', 'Teletrabajo']

export default function Hero({ x1, renting, slogan }) {
  const { add, requestContact } = useShop()
  const [first, ...rest] = slogan.split(', ')

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
      {/* halos */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-eco-200/50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-60 h-[420px] w-[420px] rounded-full bg-tech-200/40 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-eco-500" /> Tecnología de economía circular de oficina
          </span>
          <h1 className="mt-5 text-[2.6rem] font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            {first},{' '}
            <span className="relative text-eco-600 sm:whitespace-nowrap">
              {rest.join(', ')}.
              <svg aria-hidden viewBox="0 0 300 12" className="absolute -bottom-2 left-0 h-3 w-full text-eco-300" preserveAspectRatio="none">
                <path d="M2 9c60-6 140-8 296-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            La <strong className="text-ink">{x1.name.replace('Impresora ', '')}</strong> borra el tóner de tus hojas impresas y
            vuelve a imprimir sobre ellas. Hasta <strong className="text-ink">8 usos por hoja</strong>, sin dañar la fibra y sin
            cambiar tu forma de trabajar.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => requestContact('renting')} className="btn-eco px-7 py-4 text-base">
              Contratar Renting · {formatEUR(renting.price)}/{renting.period}
              <Arrow />
            </button>
            <button onClick={() => add(x1)} className="btn-tech px-7 py-4 text-base">
              <Cart /> Comprar X1 · {formatEUR(x1.price)}
            </button>
          </div>
          <p className="mt-3 text-sm text-ink/55">Renting con cartuchos ilimitados incluidos · IVA no incluido</p>

          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Pensado para">
            {AUDIENCE.map((a) => (
              <li key={a} className="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-xs font-medium text-ink/70">
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: hoja reutilizada 8 veces */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="sheet relative aspect-[4/5] overflow-hidden p-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-eco-500 via-eco-400 to-tech-500" />
            <div className="flex h-full flex-col items-center justify-center">
              <Logo className="h-48 w-48 sm:h-56 sm:w-56" animated />
              <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">Ciclo de vida de una hoja</p>
              <ol className="mt-4 flex gap-1.5" aria-label="Hasta 8 usos por hoja">
                {Array.from({ length: 8 }, (_, i) => (
                  <li
                    key={i}
                    className="grid h-9 w-7 place-items-center rounded-[4px] border border-ink/10 bg-paper text-[11px] font-bold text-eco-700 shadow-sm"
                    style={{ transform: `translateY(${i % 2 ? 3 : 0}px)` }}
                  >
                    {i + 1}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="sheet absolute -left-4 top-10 hidden px-4 py-3 sm:block">
            <p className="font-display text-2xl font-bold text-tech-600">22 ppm</p>
            <p className="text-xs text-ink/60">impresión</p>
          </div>
          <div className="sheet absolute -right-4 bottom-12 hidden px-4 py-3 sm:block">
            <p className="font-display text-2xl font-bold text-eco-600">−87,5 %</p>
            <p className="text-xs text-ink/60">hojas nuevas con 8 usos</p>
          </div>
        </div>
      </div>
    </section>
  )
}
