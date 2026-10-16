import { Cycle, Eye, Leaf, Shield, Spark, Bolt } from './Icons.jsx'

const VALUE_ICONS = { Sostenibilidad: Leaf, 'Innovación tecnológica': Spark, Eficiencia: Bolt, 'Responsabilidad ambiental': Cycle, Transparencia: Eye }

const AUDIENCES = [
  { title: 'Profesionales y sector público', text: 'Oficinas corporativas, notarías, despachos de abogados, academias y administraciones públicas con alto volumen de borradores y copias internas.' },
  { title: 'Usuarios individuales (20–65 años)', text: 'Estudiantes universitarios y teletrabajadores que imprimen apuntes, revisiones y documentos de trabajo cada semana.' },
]

export default function About({ company }) {
  return (
    <section id="nosotros" className="border-y border-ink/5 bg-white/60 py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="eyebrow">Sobre nosotros</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">El papel no tiene por qué ser de un solo uso.</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="sheet relative p-8">
            <span className="absolute right-6 top-6 font-display text-6xl font-bold text-eco-100">01</span>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-eco-700">Misión</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{company.mission}</p>
          </article>
          <article className="relative rounded-2xl bg-tech-950 p-8 text-white shadow-sheet">
            <span className="absolute right-6 top-6 font-display text-6xl font-bold text-white/10">2030</span>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-tech-300">Visión</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{company.vision}</p>
          </article>
        </div>

        <h3 className="mt-16 text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">Nuestros valores</h3>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {company.values.map((v) => {
            const Icon = VALUE_ICONS[v] ?? Shield
            return (
              <li key={v} className="sheet flex flex-col gap-3 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-eco-50 text-eco-700">
                  <Icon />
                </span>
                <span className="font-display font-semibold leading-snug">{v}</span>
              </li>
            )
          })}
        </ul>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="border-l-2 border-eco-400 pl-5">
              <h4 className="font-display text-lg font-semibold">{a.title}</h4>
              <p className="mt-2 text-ink/70">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
