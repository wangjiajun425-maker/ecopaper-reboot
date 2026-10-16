"""Catálogo de EcoPaper Reboot S.L. — fuente única de verdad para productos y planes."""

from decimal import Decimal

COMPANY = {
    "name": "EcoPaper Reboot S.L.",
    "slogan": "Reimprime el futuro, reduce el papel",
    "addresses": {
        "headquarters": "C/ Innovación N° 12, Nave 4, Madrid",
        "commercial": "Calle Innovación 12, Polígono Industrial San Fernando, Madrid",
    },
    "mission": (
        "Transformar la gestión del papel en oficinas y hogares mediante tecnología sostenible, "
        "permitiendo reutilizar las hojas impresas y reduciendo drásticamente la huella de carbono "
        "y el consumo de recursos forestales."
    ),
    "vision": (
        "Ser la marca líder y referente global en tecnología de economía circular de oficina para "
        "el año 2030, logrando un modelo de consumo de papel \"Zero Waste\"."
    ),
    "values": [
        "Sostenibilidad",
        "Innovación tecnológica",
        "Eficiencia",
        "Responsabilidad ambiental",
        "Transparencia",
    ],
}

PRODUCTS = [
    {
        "sku": "EPR-X1",
        "name": "Impresora EcoPaper Reboot X1",
        "category": "printer",
        "featured": True,
        "price": Decimal("499.00"),
        "unit": "ud.",
        "features": [
            {"label": "Mecanismo dual", "value": "Módulo borrador mediante luz térmica-química y módulo de impresión convencional de alta eficiencia."},
            {"label": "Capacidad de reutilización", "value": "Permite reutilizar cada hoja de papel de 80 g hasta 8 veces sin deteriorar la fibra."},
            {"label": "Velocidad", "value": "15 páginas por minuto en borrado y 22 ppm en impresión."},
            {"label": "Conectividad", "value": "Wi-Fi 6, Ethernet, USB-C y app móvil."},
            {"label": "Consumo energético", "value": "Certificación Energy Star."},
        ],
    },
    {"sku": "EPR-ECL500", "name": "Cartucho EcoClean Liquid", "description": "Líquido borrador 500 ml", "category": "consumable", "price": Decimal("29.90"), "unit": "ud."},
    {"sku": "EPR-SOT", "name": "Sensores ópticos de tinta", "description": "Detección precisa de tóner residual por hoja", "category": "component", "price": Decimal("18.50"), "unit": "ud."},
    {"sku": "EPR-PPR", "name": "Pasta de papel 100% reciclada", "description": "Materia prima para regenerar hojas al final de su ciclo", "category": "consumable", "price": Decimal("2.40"), "unit": "kg"},
    {"sku": "EPR-RDP", "name": "Pack Recambio Rodillos Despigmentadores", "description": "Mantiene la calidad de borrado ciclo tras ciclo", "category": "component", "price": Decimal("19.50"), "unit": "pack"},
]

PLANS = [
    {
        "id": "renting",
        "name": "Renting Ecológico",
        "price": Decimal("35.00"),
        "period": "mes",
        "highlight": True,
        "includes": [
            "Impresora EcoPaper Reboot X1 incluida",
            "Cartuchos EcoClean Liquid ilimitados",
            "Sustitución de equipo en caso de avería",
            "Informe mensual de papel y CO₂ ahorrados",
        ],
    },
    {
        "id": "mantenimiento",
        "name": "Mantenimiento Anual y Asistencia Técnica Pyme",
        "price": Decimal("120.00"),
        "period": "año",
        "highlight": False,
        "includes": [
            "Revisión preventiva anual in situ",
            "Asistencia técnica remota prioritaria",
            "Actualizaciones de firmware y app",
            "Diagnóstico de rodillos y sensores",
        ],
    },
]
