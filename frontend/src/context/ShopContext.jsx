import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [items, setItems] = useState([]) // [{ sku, name, price, unit, qty }]
  const [cartOpen, setCartOpen] = useState(false)
  const [contactPrefill, setContactPrefill] = useState(null) // { interest, message, nonce }

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.sku === product.sku)
      if (found) return prev.map((i) => (i.sku === product.sku ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { sku: product.sku, name: product.name, price: product.price, unit: product.unit, qty }]
    })
    setCartOpen(true)
  }, [])

  const setQty = useCallback((sku, qty) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.sku !== sku) : prev.map((i) => (i.sku === sku ? { ...i, qty } : i))))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  /** Lleva al usuario al formulario con el interés preseleccionado. */
  const requestContact = useCallback((interest, message = '') => {
    setContactPrefill({ interest, message, nonce: Date.now() })
    setCartOpen(false)
    requestAnimationFrame(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }))
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0)
    const total = items.reduce((s, i) => s + i.qty * i.price, 0)
    return { items, count, total, add, setQty, clear, cartOpen, setCartOpen, contactPrefill, requestContact }
  }, [items, add, setQty, clear, cartOpen, contactPrefill, requestContact])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => useContext(ShopContext)
