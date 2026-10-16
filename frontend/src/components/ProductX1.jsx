import { Bolt, Cart, Cycle, Gauge, Layers, Wifi, Arrow } from './Icons.jsx'
import Logo from './Logo.jsx'
import { formatEUR } from '../lib/api.js'
import { useShop } from '../context/ShopContext.jsx'

const FEATURE_ICONS = {
  'Mecanismo dual': Layers,
  'Capacidad de reutilización': Cycle,
  Velocidad: Gauge,
  Conectividad: Wifi,
  'Consumo energético': Bolt,
}

export default function ProductX1({ product, renting }) {
  const { add, requestContact } = useShop()

  return (
    <section id="x1" className="py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="eyebrow">Producto estrella</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">{product.name}</h2>
          <p className="mt-4 text-ink/70">Borra, imprime y vuelve a empezar. Un solo equipo para cerrar el ciclo del papel en tu oficina o en casa.</p>

          <div className="sheet mt-8 overflow-hidden">
            <div className="flex items-center justify-center bg-gradient-to-br from-paper-200 to-white py-10">
              {/* Placeholder de fotografía de producto */}
              <div className="relative">
                <div className="h-28 w-56 rounded-2xl bg-gradient-to-b from-tech-500 to-tech-700 shadow-sheet" />
                <div className="absolute left-1/2 top-4 h-2 w-40 -translate-x-1/2 rounded-full bg-tech-950" />
                <div className="absolute -top-14 left-1/2 h-20 w-32 -translate-x-1/2 rounded-sm border border-ink/10 bg-white animate-feed" />
                <Logo className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white p-0.5" />
              </div>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-ink/5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Compra directa</p>
                <p className="font-display text-4xl font-bold">
                  {formatEUR(product.price)} <span className="text-base font-medium text-ink/50">/ {product.unit}</span>
                </p>
              </div>
              <button onClick={() => add(product)} className="btn-tech">
                <Cart /> Añadir al carrito
              </button>
            </div>
            <button
              onClick={() => requestContact('renting')}
              className="flex w-full items-center justify-between gap-3 bg-eco-50 px-6 py-4 text-left text-sm font-semibold text-eco-800 transition hover:bg-eco-100"
            >
              <span>
                ¿Prefieres no inmovilizar capital? Renting desde {formatEUR(renting.price)}/{renting.period} con cartuchos ilimitados
              </span>
              <Arrow className="h-5 w-5 shrink-0" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">Características técnicas</h3>
          <ul className="mt-5 divide-y divide-ink/5 sheet">
            {product.features.map((f) => {
              const Icon = FEATURE_ICONS[f.label] ?? Layers
              return (
                <li key={f.label} className="flex gap-5 p-6 sm:p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tech-50 text-tech-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-semibold">{f.label}</h4>
                    <p className="mt-1 leading-relaxed text-ink/70">{f.value}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              ['8×', 'usos por hoja'],
              ['15 ppm', 'borrado'],
              ['22 ppm', 'impresión'],
            ].map(([k, v]) => (
              <div key={v} className="rounded-2xl border border-ink/10 bg-white/70 px-3 py-5">
                <dt className="sr-only">{v}</dt>
                <dd className="font-display text-2xl font-bold text-eco-700 sm:text-3xl">{k}</dd>
                <dd className="mt-1 text-xs text-ink/60">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
