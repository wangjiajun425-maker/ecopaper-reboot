// Copia local del catálogo (backend/catalog.py). Se usa como respaldo si la API no responde,
// de modo que la web siga siendo navegable sin backend.

export const COMPANY = {
  name: 'EcoPaper Reboot S.L.',
  slogan: 'Reimprime el futuro, reduce el papel',
  addresses: {
    headquarters: 'C/ Innovación N° 12, Nave 4, Madrid',
    commercial: 'Calle Innovación 12, Polígono Industrial San Fernando, Madrid',
  },
  mission:
    'Transformar la gestión del papel en oficinas y hogares mediante tecnología sostenible, permitiendo reutilizar las hojas impresas y reduciendo drásticamente la huella de carbono y el consumo de recursos forestales.',
  vision:
    'Ser la marca líder y referente global en tecnología de economía circular de oficina para el año 2030, logrando un modelo de consumo de papel "Zero Waste".',
  values: ['Sostenibilidad', 'Innovación tecnológica', 'Eficiencia', 'Responsabilidad ambiental', 'Transparencia'],
}

export const PRODUCTS = [
  {
    sku: 'EPR-X1',
    name: 'Impresora EcoPaper Reboot X1',
    category: 'printer',
    featured: true,
    price: 499.0,
    unit: 'ud.',
    features: [
      { label: 'Mecanismo dual', value: 'Módulo borrador mediante luz térmica-química y módulo de impresión convencional de alta eficiencia.' },
      { label: 'Capacidad de reutilización', value: 'Permite reutilizar cada hoja de papel de 80 g hasta 8 veces sin deteriorar la fibra.' },
      { label: 'Velocidad', value: '15 páginas por minuto en borrado y 22 ppm en impresión.' },
      { label: 'Conectividad', value: 'Wi-Fi 6, Ethernet, USB-C y app móvil.' },
      { label: 'Consumo energético', value: 'Certificación Energy Star.' },
    ],
  },
  { sku: 'EPR-ECL500', name: 'Cartucho EcoClean Liquid', description: 'Líquido borrador 500 ml', category: 'consumable', price: 29.9, unit: 'ud.' },
  { sku: 'EPR-SOT', name: 'Sensores ópticos de tinta', description: 'Detección precisa de tóner residual por hoja', category: 'component', price: 18.5, unit: 'ud.' },
  { sku: 'EPR-PPR', name: 'Pasta de papel 100% reciclada', description: 'Materia prima para regenerar hojas al final de su ciclo', category: 'consumable', price: 2.4, unit: 'kg' },
  { sku: 'EPR-RDP', name: 'Pack Recambio Rodillos Despigmentadores', description: 'Mantiene la calidad de borrado ciclo tras ciclo', category: 'component', price: 19.5, unit: 'pack' },
]

export const PLANS = [
  {
    id: 'renting',
    name: 'Renting Ecológico',
    price: 35.0,
    period: 'mes',
    highlight: true,
    includes: [
      'Impresora EcoPaper Reboot X1 incluida',
      'Cartuchos EcoClean Liquid ilimitados',
      'Sustitución de equipo en caso de avería',
      'Informe mensual de papel y CO₂ ahorrados',
    ],
  },
  {
    id: 'mantenimiento',
    name: 'Mantenimiento Anual y Asistencia Técnica Pyme',
    price: 120.0,
    period: 'año',
    highlight: false,
    includes: [
      'Revisión preventiva anual in situ',
      'Asistencia técnica remota prioritaria',
      'Actualizaciones de firmware y app',
      'Diagnóstico de rodillos y sensores',
    ],
  },
]

export const SEGMENTS = [
  { value: 'oficina', label: 'Oficina corporativa' },
  { value: 'notaria', label: 'Notaría' },
  { value: 'abogados', label: 'Despacho de abogados' },
  { value: 'academia', label: 'Academia / centro formativo' },
  { value: 'administracion', label: 'Administración pública' },
  { value: 'estudiante', label: 'Estudiante universitario' },
  { value: 'teletrabajo', label: 'Teletrabajo' },
  { value: 'otro', label: 'Otro' },
]

export const INTERESTS = [
  { value: 'renting', label: 'Renting Ecológico (35 €/mes)' },
  { value: 'compra_x1', label: 'Comprar Impresora X1 (499 €)' },
  { value: 'mantenimiento', label: 'Mantenimiento Anual Pyme (120 €/año)' },
  { value: 'consumibles', label: 'Componentes y consumibles' },
  { value: 'otro', label: 'Otra consulta' },
]
