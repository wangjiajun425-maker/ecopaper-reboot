import { useId, useState } from 'react'
import { formatEUR } from '../lib/api.js'
import { useShop } from '../context/ShopContext.jsx'

const SHEET_KG = (0.21 * 0.297 * 80) / 1000 // A4 de 80 g/m² ≈ 4,99 g
const nf = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 })
const nf1 = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 })

export default function SavingsCalculator({ x1, renting }) {
  const { add, requestContact } = useShop()
  const ids = { pages: useId(), uses: useId(), price: useId() }
  const [pages, setPages] = useState(3000)
  const [uses, setUses] = useState(8)
  const [packPrice, setPackPrice] = useState(4.5)

  const yearly = pages * 12
  const newSheets = Math.ceil(yearly / uses)
  const saved = yearly - newSheets
  const kg = saved * SHEET_KG
  const packs = saved / 500
  const money = packs * (Number(packPrice) || 0)
  const rentingYear = renting.price * 12

  return (
    <section id="ahorro" className="bg-eco-950 py-20 text-white lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow text-eco-300">Calculadora de impacto</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">¿Cuánto papel deja de comprar tu oficina?</h2>
          <p className="mt-4 max-w-lg text-white/70">
            Ajusta tu volumen de impresión y descubre el ahorro anual de hojas nuevas al reutilizar cada hoja con la X1.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor={ids.pages} className="font-medium">Páginas impresas al mes</label>
                <output htmlFor={ids.pages} className="font-display text-2xl font-bold text-eco-300">{nf.format(pages)}</output>
              </div>
              <input
                id={ids.pages}
                type="range"
                min={100}
                max={20000}
                step={100}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="mt-3 w-full accent-eco-400"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor={ids.uses} className="font-medium">Usos por hoja</label>
                <output htmlFor={ids.uses} className="font-display text-2xl font-bold text-eco-300">{uses}×</output>
              </div>
              <input
                id={ids.uses}
                type="range"
                min={1}
                max={8}
                value={uses}
                onChange={(e) => setUses(Number(e.target.value))}
                className="mt-3 w-full accent-eco-400"
              />
              <p className="mt-1 text-xs text-white/50">La X1 permite hasta 8 usos por hoja de 80 g.</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label htmlFor={ids.price} className="font-medium">Precio de tu paquete de 500 hojas</label>
              <div className="relative w-28">
                <input
                  id={ids.price}
                  type="number"
                  min={0}
                  step={0.1}
                  value={packPrice}
                  onChange={(e) => setPackPrice(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-2 pl-3 pr-8 text-right text-white focus:border-eco-300 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">€</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4" aria-live="polite">
          <div className="grid grid-cols-2 gap-4">
            <Stat value={nf.format(saved)} label="hojas nuevas evitadas / año" accent />
            <Stat value={`${nf1.format(kg)} kg`} label="de papel ahorrado / año" />
            <Stat value={nf1.format(packs)} label="paquetes de 500 evitados" />
            <Stat value={formatEUR(money)} label="ahorro estimado en papel / año" accent />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Coste del primer año</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-sm text-white/60">Compra X1</p>
                <p className="font-display text-2xl font-bold">{formatEUR(x1.price)}</p>
                <p className="text-xs text-white/50">pago único · consumibles aparte</p>
                <button onClick={() => add(x1)} className="btn-tech mt-4 w-full py-2.5">Comprar X1</button>
              </div>
              <div className="rounded-xl bg-eco-500/15 p-4 ring-1 ring-eco-400/40">
                <p className="text-sm text-eco-200">Renting Ecológico</p>
                <p className="font-display text-2xl font-bold">{formatEUR(rentingYear)}</p>
                <p className="text-xs text-white/60">12 × {formatEUR(renting.price)} · cartuchos ilimitados</p>
                <button onClick={() => requestContact('renting', `Imprimimos unas ${nf.format(pages)} páginas al mes.`)} className="btn-eco mt-4 w-full py-2.5">
                  Contratar Renting
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/40">Estimación orientativa. Peso calculado para A4 de 80 g/m² (≈ 5 g por hoja). Precios sin IVA.</p>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label, accent }) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? 'bg-eco-500/15 ring-1 ring-eco-400/30' : 'bg-white/5 ring-1 ring-white/10'}`}>
      <p className="font-display text-2xl font-bold sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm text-white/60">{label}</p>
    </div>
  )
}
