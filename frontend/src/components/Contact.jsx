import { useEffect, useRef, useState } from 'react'
import { Check, Mail, Pin } from './Icons.jsx'
import { INTERESTS, SEGMENTS, COMPANY } from '../data/catalog.js'
import { sendContact } from '../lib/api.js'
import { useShop } from '../context/ShopContext.jsx'

const EMPTY = { name: '', email: '', company: '', phone: '', segment: 'oficina', interest: 'renting', message: '', consent: false, website: '' }

function validate(f) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Indica tu nombre.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Introduce un email válido.'
  if (f.phone && !/^[0-9+\s()-]{6,30}$/.test(f.phone)) e.phone = 'Teléfono no válido.'
  if (f.message.trim().length < 10) e.message = 'Cuéntanos un poco más (mín. 10 caracteres).'
  if (!f.consent) e.consent = 'Necesitamos tu consentimiento para responderte.'
  return e
}

export default function Contact() {
  const { contactPrefill } = useShop()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const nameRef = useRef(null)

  useEffect(() => {
    if (!contactPrefill) return
    setForm((f) => ({ ...f, interest: contactPrefill.interest, message: contactPrefill.message || f.message }))
    setStatus({ state: 'idle', message: '' })
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500)
  }, [contactPrefill])

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus({ state: 'loading', message: '' })
    try {
      const payload = { ...form, company: form.company || null, phone: form.phone || null, website: form.website || null }
      const res = await sendContact(payload)
      setStatus({ state: 'success', message: res.message })
      setForm(EMPTY)
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'No se pudo enviar. Inténtalo de nuevo.' })
    }
  }

  const err = (k) =>
    errors[k] && (
      <p id={`${k}-error`} className="mt-1.5 text-xs font-medium text-red-600">
        {errors[k]}
      </p>
    )
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined })

  return (
    <section id="contacto" className="py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <span className="eyebrow">Contacto</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Hablemos de tu papel.</h2>
          <p className="mt-4 text-ink/70">
            Te preparamos una propuesta de Renting Ecológico o de compra adaptada a tu volumen de impresión. Respuesta en menos de 24 h laborables.
          </p>
          <ul className="mt-10 space-y-5">
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-eco-50 text-eco-700"><Pin /></span>
              <div>
                <p className="font-semibold">Sede y almacén</p>
                <p className="text-ink/65">{COMPANY.addresses.headquarters}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-tech-50 text-tech-600"><Pin /></span>
              <div>
                <p className="font-semibold">Oficina comercial</p>
                <p className="text-ink/65">{COMPANY.addresses.commercial}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="sheet p-6 sm:p-10">
          {status.state === 'success' ? (
            <div className="flex flex-col items-center py-12 text-center" role="status">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-eco-100 text-eco-700"><Check className="h-8 w-8" /></span>
              <h3 className="mt-6 text-2xl font-bold">Solicitud enviada</h3>
              <p className="mt-2 max-w-sm text-ink/70">{status.message}</p>
              <button onClick={() => setStatus({ state: 'idle', message: '' })} className="btn-ghost mt-8">Enviar otra consulta</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className="mb-3 text-sm font-semibold">¿Qué te interesa?</legend>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <label
                      key={i.value}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-tech-500 ${
                        form.interest === i.value ? 'border-eco-600 bg-eco-600 text-white' : 'border-ink/15 bg-white hover:border-ink/30'
                      }`}
                    >
                      <input type="radio" name="interest" value={i.value} checked={form.interest === i.value} onChange={set('interest')} className="sr-only" />
                      {i.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Nombre y apellidos *</label>
                <input ref={nameRef} id="c-name" className="field" autoComplete="name" value={form.name} onChange={set('name')} {...aria('name')} />
                {err('name')}
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">Email *</label>
                <input id="c-email" type="email" className="field" autoComplete="email" value={form.email} onChange={set('email')} {...aria('email')} />
                {err('email')}
              </div>
              <div>
                <label htmlFor="c-company" className="mb-1.5 block text-sm font-medium">Empresa / organismo</label>
                <input id="c-company" className="field" autoComplete="organization" value={form.company} onChange={set('company')} />
              </div>
              <div>
                <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium">Teléfono</label>
                <input id="c-phone" type="tel" className="field" autoComplete="tel" value={form.phone} onChange={set('phone')} {...aria('phone')} />
                {err('phone')}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-segment" className="mb-1.5 block text-sm font-medium">Tipo de cliente</label>
                <select id="c-segment" className="field" value={form.segment} onChange={set('segment')}>
                  {SEGMENTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">Mensaje *</label>
                <textarea id="c-message" rows={5} className="field resize-y" value={form.message} onChange={set('message')} placeholder="Nº de equipos, páginas al mes, plazos…" {...aria('message')} />
                {err('message')}
              </div>

              {/* Honeypot */}
              <div aria-hidden className="absolute -left-[9999px]">
                <label htmlFor="c-website">Web</label>
                <input id="c-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-ink/70">
                  <input type="checkbox" checked={form.consent} onChange={set('consent')} className="mt-0.5 h-4 w-4 rounded accent-eco-600" {...aria('consent')} />
                  <span>
                    Acepto que EcoPaper Reboot S.L. trate mis datos para responder a esta solicitud, conforme a la{' '}
                    <a href="#privacidad" className="font-medium text-tech-600 underline underline-offset-2">política de privacidad</a>.
                  </span>
                </label>
                {err('consent')}
              </div>

              {status.state === 'error' && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{status.message}</p>
              )}

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-xs text-ink/50"><Mail className="h-4 w-4" /> Sin spam. Solo te escribiremos sobre tu consulta.</p>
                <button type="submit" disabled={status.state === 'loading'} className="btn-eco px-8 py-4">
                  {status.state === 'loading' ? 'Enviando…' : 'Enviar solicitud'}
                </button>
              </div>
              {status.state === 'loading' && (
                <p className="text-xs text-ink/50 sm:col-span-2 sm:text-right">
                  Si el servidor estaba en reposo, el primer envío puede tardar hasta un minuto.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
