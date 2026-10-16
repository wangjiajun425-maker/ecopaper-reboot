import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import ProductX1 from './components/ProductX1.jsx'
import SavingsCalculator from './components/SavingsCalculator.jsx'
import Consumables from './components/Consumables.jsx'
import Pricing from './components/Pricing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import { useApi } from './lib/api.js'
import { COMPANY, PLANS, PRODUCTS } from './data/catalog.js'

export default function App() {
  const products = useApi('/api/products', PRODUCTS)
  const plans = useApi('/api/plans', PLANS)
  const company = useApi('/api/company', COMPANY)

  const x1 = products.find((p) => p.featured) ?? PRODUCTS[0]
  const accessories = products.filter((p) => !p.featured)
  const renting = plans.find((p) => p.id === 'renting') ?? PLANS[0]

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main">
        <Hero x1={x1} renting={renting} slogan={company.slogan} />
        <About company={company} />
        <ProductX1 product={x1} renting={renting} />
        <SavingsCalculator x1={x1} renting={renting} />
        <Consumables products={accessories} />
        <Pricing plans={plans} x1={x1} />
        <Contact />
      </main>
      <Footer company={company} />
      <CartDrawer />
    </>
  )
}
