import { useEffect } from 'react'
import { Close, Minus, Plus, Cart } from './Icons.jsx'
import { formatEUR } from '../lib/api.js'
import { useShop } from '../context/ShopContext.jsx'

export default function CartDrawer() {
  const { items, total, setQty, cartOpen, setCartOpen, requestContact } = useShop()

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cartOpen, setCartOpen])

  function checkout() {
    const lines = items.map((i) => `• ${i.qty} × ${i.name} (${formatEUR(i.price)}/${i.unit})`).join('\n')
    const interest = items.some((i) => i.sku === 'EPR-X1') ? 'compra_x1' : 'consumibles'
    requestContact(interest, `Quiero realizar el siguiente pedido:\n${lines}\nTotal estimado: ${formatEUR(total)} (IVA no incluido)`)
  }

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? '' : 'pointer-events-none'}`} aria-hidden={!cartOpen}>
      <div onClick={() => setCartOpen(false)} className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity ${cartOpen ? 'opacity-100' : 'opacity-0'}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="text-xl font-bold">Tu carrito</h2>
          <button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Cerrar carrito" tabIndex={cartOpen ? 0 : -1}>
            <Close />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-ink/60">
            <Cart className="h-10 w-10" />
            <p>Tu carrito está vacío.</p>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-ink/5 overflow-y-auto px-6">
            {items.map((i) => (
              <li key={i.sku} className="flex items-center justify-between gap-4 py-5">
                <div className="min-w-0">
                  <p className="font-semibold leading-snug">{i.name}</p>
                  <p className="text-sm text-ink/55">{formatEUR(i.price)} / {i.unit}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(i.sku, i.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full border border-ink/15" aria-label={`Quitar una unidad de ${i.name}`} tabIndex={cartOpen ? 0 : -1}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-semibold tabular-nums">{i.qty}</span>
                  <button onClick={() => setQty(i.sku, i.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full border border-ink/15" aria-label={`Añadir una unidad de ${i.name}`} tabIndex={cartOpen ? 0 : -1}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="space-y-3 border-t border-ink/10 p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-ink/60">Total (sin IVA)</span>
            <span className="font-display text-2xl font-bold">{formatEUR(total)}</span>
          </div>
          <button onClick={checkout} disabled={!items.length} className="btn-tech w-full py-4" tabIndex={cartOpen ? 0 : -1}>
            Solicitar pedido
          </button>
          <button onClick={() => requestContact('renting')} className="btn w-full text-eco-700 hover:bg-eco-50" tabIndex={cartOpen ? 0 : -1}>
            o pásate al Renting Ecológico · 35 €/mes
          </button>
        </footer>
      </aside>
    </div>
  )
}
