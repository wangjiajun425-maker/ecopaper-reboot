"""API de EcoPaper Reboot S.L.

Ejecutar:  uvicorn main:app --reload --port 8000
"""

import logging
import os
import sqlite3
from contextlib import asynccontextmanager, closing
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field, field_validator

from catalog import COMPANY, PLANS, PRODUCTS

DB_PATH = Path(os.getenv("ECOPAPER_DB", Path(__file__).with_name("ecopaper.db")))
ALLOWED_ORIGINS = os.getenv("ECOPAPER_CORS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
# Permite por defecto los despliegues en Vercel (*.vercel.app) sin configurar nada más.
ALLOWED_ORIGIN_REGEX = os.getenv("ECOPAPER_CORS_REGEX", r"https://.*\.vercel\.app")

log = logging.getLogger("ecopaper")
logging.basicConfig(level=logging.INFO)


def init_db() -> None:
    with closing(sqlite3.connect(DB_PATH)) as conn, conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS contact_requests (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at    TEXT NOT NULL,
                name          TEXT NOT NULL,
                email         TEXT NOT NULL,
                company       TEXT,
                phone         TEXT,
                segment       TEXT NOT NULL,
                interest      TEXT NOT NULL,
                message       TEXT NOT NULL,
                ip            TEXT
            )
            """
        )


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(title="EcoPaper Reboot API", version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()],
    allow_origin_regex=ALLOWED_ORIGIN_REGEX or None,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


# ---------- Modelos ----------

class Segment(str, Enum):
    oficina = "oficina"
    notaria = "notaria"
    abogados = "abogados"
    academia = "academia"
    administracion = "administracion"
    estudiante = "estudiante"
    teletrabajo = "teletrabajo"
    otro = "otro"


class Interest(str, Enum):
    renting = "renting"
    compra_x1 = "compra_x1"
    mantenimiento = "mantenimiento"
    consumibles = "consumibles"
    otro = "otro"


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    phone: Optional[str] = Field(default=None, max_length=30, pattern=r"^[0-9+\s()\-]*$")
    segment: Segment
    interest: Interest
    message: str = Field(min_length=10, max_length=4000)
    consent: bool
    # Honeypot anti-spam: los humanos no ven este campo.
    website: Optional[str] = Field(default=None, max_length=200)

    @field_validator("name", "company", "message", mode="before")
    @classmethod
    def strip_text(cls, v):
        return v.strip() if isinstance(v, str) else v

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Debes aceptar la política de privacidad")
        return v


class ContactResponse(BaseModel):
    ok: bool
    id: Optional[int] = None
    message: str


FIELD_ERRORS = {
    "name": "Indica tu nombre (mín. 2 caracteres).",
    "email": "Introduce un email válido.",
    "phone": "Teléfono no válido.",
    "segment": "Tipo de cliente no válido.",
    "interest": "Selecciona un interés válido.",
    "message": "El mensaje debe tener entre 10 y 4000 caracteres.",
    "consent": "Debes aceptar la política de privacidad.",
}


@app.exception_handler(RequestValidationError)
async def validation_error_es(_: Request, exc: RequestValidationError):
    detail = []
    for err in exc.errors():
        field = err["loc"][-1] if err["loc"] else None
        detail.append({"field": field, "msg": FIELD_ERRORS.get(field, "Dato no válido.")})
    return JSONResponse(status_code=422, content={"detail": detail})


# ---------- Endpoints ----------

@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/company")
def company():
    return COMPANY


@app.get("/api/products")
def products(category: Optional[str] = None):
    items = PRODUCTS if category is None else [p for p in PRODUCTS if p["category"] == category]
    return items


@app.get("/api/products/{sku}")
def product(sku: str):
    for p in PRODUCTS:
        if p["sku"].lower() == sku.lower():
            return p
    raise HTTPException(status_code=404, detail="Producto no encontrado")


@app.get("/api/plans")
def plans():
    return PLANS


@app.post("/api/contact", response_model=ContactResponse, status_code=201)
def contact(payload: ContactRequest, request: Request):
    if payload.website:
        # Bot detectado: respondemos OK sin guardar.
        return ContactResponse(ok=True, message="Solicitud recibida")

    with closing(sqlite3.connect(DB_PATH)) as conn, conn:
        cur = conn.execute(
            """INSERT INTO contact_requests
               (created_at, name, email, company, phone, segment, interest, message, ip)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                datetime.now(timezone.utc).isoformat(),
                payload.name,
                payload.email,
                payload.company,
                payload.phone,
                payload.segment.value,
                payload.interest.value,
                payload.message,
                request.client.host if request.client else None,
            ),
        )
        request_id = cur.lastrowid

    log.info("Nueva solicitud #%s (%s) de %s", request_id, payload.interest.value, payload.email)
    # Punto de extensión: enviar email al equipo comercial / CRM aquí.
    return ContactResponse(
        ok=True,
        id=request_id,
        message="¡Gracias! Nuestro equipo comercial te contactará en menos de 24 h laborables.",
    )
