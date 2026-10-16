import { Plus } from './Icons.jsx'
import { formatEUR } from '../lib/api.js'
import { useShop } from '../context/ShopContext.jsx'

const TAG = { consumable: 'Consumible', component: 'Componente' }

export default function Consumables({ products }) {
  const { add } = useShop()

  return (
    <section id="consumibles" className="py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Tienda</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Componentes y consumibles</h2>
          </div>
          <p className="max-w-sm text-ink/60">Recambios originales para mantener tu X1 borrando e imprimiendo como el primer día.</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.sku} className="sheet group flex flex-col p-6 transition hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                    p.category === 'consumable' ? 'bg-eco-50 text-eco-700' : 'bg-tech-50 text-tech-700'
                  }`}
                >
                  {TAG[p.category] ?? 'Accesorio'}
                </span>
                <span className="font-mono text-[11px] text-ink/40">{p.sku}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-snug">{p.name}</h3>
              {p.description && <p className="mt-2 text-sm text-ink/60">{p.description}</p>}
              <div className="mt-auto flex items-end justify-between pt-8">
                <p className="font-display text-2xl font-bold">
                  {formatEUR(p.price)}
                  <span className="text-sm font-medium text-ink/50"> / {p.unit}</span>
                </p>
                <button
                  onClick={() => add(p)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition group-hover:bg-eco-600"
                  aria-label={`Añadir ${p.name} al carrito`}
                >
                  <Plus />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
