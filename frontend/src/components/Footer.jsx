import Logo from './Logo.jsx'
import { useShop } from '../context/ShopContext.jsx'

export default function Footer({ company }) {
  const { requestContact } = useShop()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white">
      <div className="container-x">
        {/* CTA final */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-14 md:flex-row md:items-center">
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">
            Tu próxima hoja <span className="text-eco-400">ya está impresa.</span>
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => requestContact('renting')} className="btn-eco px-7 py-4">Contratar Renting Ecológico</button>
            <a href="#x1" className="btn border border-white/20 px-7 py-4 text-white hover:bg-white/10">Ver Impresora X1</a>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Logo className="h-11 w-11 rounded-full bg-white p-1" />
              <span className="font-display text-lg font-bold">{company.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-white/60">{company.slogan}.</p>
          </div>

          <address className="not-italic">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">Sede</p>
            <p className="mt-3 text-white/80">{company.addresses.headquarters}</p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/50">Comercial</p>
            <p className="mt-3 text-white/80">{company.addresses.commercial}</p>
          </address>

          <nav aria-label="Pie de página">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">Explora</p>
            <ul className="mt-3 space-y-2 text-white/80">
              <li><a className="hover:text-eco-300" href="#nosotros">Sobre nosotros</a></li>
              <li><a className="hover:text-eco-300" href="#x1">Impresora X1</a></li>
              <li><a className="hover:text-eco-300" href="#consumibles">Consumibles</a></li>
              <li><a className="hover:text-eco-300" href="#planes">Planes</a></li>
              <li><a className="hover:text-eco-300" href="#contacto">Contacto</a></li>
            </ul>
          </nav>
        </div>

        <div id="privacidad" className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {year} {company.name} Todos los derechos reservados.</p>
          <p>Aviso legal · Política de privacidad · Cookies</p>
        </div>
      </div>
    </footer>
  )
}
