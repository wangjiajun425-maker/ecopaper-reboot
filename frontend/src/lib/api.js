import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_API_URL ?? ''

const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
export const formatEUR = (n) => eur.format(Number(n))

/** Carga un recurso de la API; si falla, conserva el valor de respaldo local. */
export function useApi(path, fallback) {
  const [data, setData] = useState(fallback)
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${BASE}${path}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((json) =>
        setData(Array.isArray(json) ? json.map((x) => ('price' in x ? { ...x, price: Number(x.price) } : x)) : json),
      )
      .catch(() => {})
    return () => ctrl.abort()
  }, [path])
  return data
}

export async function sendContact(payload) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = Array.isArray(body.detail)
      ? body.detail.map((d) => d.msg.replace(/^Value error, /, '')).join(' · ')
      : body.detail || 'No se pudo enviar la solicitud.'
    throw new Error(detail)
  }
  return body
}
