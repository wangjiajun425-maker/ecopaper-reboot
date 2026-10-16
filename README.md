# EcoPaper Reboot S.L. — Web corporativa y tienda

> *Reimprime el futuro, reduce el papel*

Monorepo con frontend **React + Vite + Tailwind CSS** y backend **Python (FastAPI + SQLite)**.

```
ecopaper-reboot/
├── backend/
│   ├── main.py          # API: catálogo, planes y POST /api/contact
│   ├── catalog.py       # Datos de negocio (fuente única de verdad)
│   ├── test_api.py      # Tests (pytest)
│   └── requirements.txt
└── frontend/
    ├── public/logo.svg  # Logotipo (favicon)
    └── src/
        ├── components/  # Navbar, Hero, About, ProductX1, SavingsCalculator,
        │                # Consumables, Pricing, Contact, CartDrawer, Footer, Logo
        ├── context/     # ShopContext: carrito + CTAs → formulario
        ├── data/        # Catálogo de respaldo (si la API no responde)
        └── lib/api.js   # Cliente HTTP y formateo €
```

## Puesta en marcha

**Backend** (puerto 8000)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Documentación interactiva: http://localhost:8000/docs

**Frontend** (puerto 5173, con proxy `/api` → 8000)

```bash
cd frontend
npm install
npm run dev
```

**Tests**: `pip install pytest httpx && pytest -q` (en `backend/`).

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Estado |
| GET | `/api/company` | Misión, visión, valores, direcciones |
| GET | `/api/products[?category=]` | Catálogo (X1, consumibles, componentes) |
| GET | `/api/products/{sku}` | Detalle de producto |
| GET | `/api/plans` | Renting Ecológico y Mantenimiento Pyme |
| POST | `/api/contact` | Solicitud de contacto → SQLite (`contact_requests`) |

`POST /api/contact` valida con Pydantic (email, longitudes, consentimiento RGPD obligatorio),
incluye honeypot anti-spam (`website`) y devuelve errores 422 en español.
Para avisar al equipo comercial o volcar a un CRM, extiende la función `contact()` en `main.py`.

## Producción

- `npm run build` genera `frontend/dist/` (estático, servible desde cualquier CDN/Nginx).
- Si la API vive en otro dominio: `VITE_API_URL=https://api.tudominio.es npm run build`
  y añade el dominio del frontend a `ECOPAPER_CORS` en el backend.
- `ECOPAPER_DB` permite cambiar la ruta de la base de datos SQLite (migrable a PostgreSQL).

## Pendiente de negocio

- Sustituir el SVG de `Logo.jsx` / `public/logo.svg` por el logotipo definitivo y el placeholder de producto por fotografías reales.
- Redactar aviso legal, política de privacidad y cookies.
- Pasarela de pago: hoy el carrito genera una *solicitud de pedido* que llega al formulario de contacto.
