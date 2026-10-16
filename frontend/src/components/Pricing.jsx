import { Check, Arrow, Cart } from './Icons.jsx'
import { formatEUR } from '../lib/api.js'
import { useShop } from '../context/ShopContext.jsx'

export default function Pricing({ plans, x1 }) {
  const { add, requestContact } = useShop()

  return (
    <section id="planes" className="border-y border-ink/5 bg-white/60 py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Planes y servicios</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Elige cómo empezar a reimprimir</h2>
          <p className="mt-4 text-ink/65">Sin permanencias ocultas. Precios por equipo, IVA no incluido.</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((plan) =>
            plan.highlight ? (
              <article key={plan.id} className="relative flex flex-col rounded-3xl bg-eco-700 p-8 text-white shadow-sheet ring-4 ring-eco-200 lg:order-2 lg:-my-4 lg:py-12">
                <span className="absolute -top-3 left-8 rounded-full bg-tech-500 px-3 py-1 text-xs font-bold uppercase tracking-wider">Más elegido</span>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-eco-100">Impresora + cartuchos ilimitados</p>
                <p className="mt-6 font-display text-5xl font-bold">
                  {formatEUR(plan.price)}
                  <span className="text-lg font-medium text-eco-100">/{plan.period}</span>
                </p>
                <Features items={plan.includes} light />
                <button onClick={() => requestContact(plan.id)} className="btn mt-8 bg-white py-4 text-base text-eco-800 hover:bg-eco-50">
                  Contratar Renting Ecológico <Arrow />
                </button>
              </article>
            ) : (
              <article key={plan.id} className="sheet flex flex-col p-8 lg:order-3">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-ink/60">Para pymes con equipos en propiedad</p>
                <p className="mt-6 font-display text-4xl font-bold">
                  {formatEUR(plan.price)}
                  <span className="text-lg font-medium text-ink/50">/{plan.period}</span>
                </p>
                <Features items={plan.includes} />
                <button onClick={() => requestContact(plan.id)} className="btn-ghost mt-8">
                  Solicitar mantenimiento
                </button>
              </article>
            ),
          )}

          <article className="sheet flex flex-col p-8 lg:order-1">
            <h3 className="text-xl font-bold">Compra directa X1</h3>
            <p className="mt-1 text-ink/60">El equipo es tuyo desde el primer día</p>
            <p className="mt-6 font-display text-4xl font-bold">
              {formatEUR(x1.price)}
              <span className="text-lg font-medium text-ink/50">/{x1.unit}</span>
            </p>
            <Features items={['Impresora EcoPaper Reboot X1', 'Hasta 8 usos por hoja de 80 g', 'Wi-Fi 6, Ethernet, USB-C y app', 'Certificación Energy Star']} />
            <button onClick={() => add(x1)} className="btn-tech mt-8">
              <Cart /> Comprar ahora
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}

function Features({ items, light }) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-sm">
          <Check className={`h-5 w-5 shrink-0 ${light ? 'text-eco-200' : 'text-eco-600'}`} />
          <span className={light ? 'text-white/90' : 'text-ink/75'}>{t}</span>
        </li>
      ))}
    </ul>
  )
}
