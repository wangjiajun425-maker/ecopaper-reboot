"""Ejecutar:  pytest -q   (requiere: pip install pytest httpx)"""

import os
import tempfile

os.environ["ECOPAPER_DB"] = os.path.join(tempfile.mkdtemp(), "test.db")

from fastapi.testclient import TestClient  # noqa: E402

from main import app  # noqa: E402

VALID = {
    "name": "Lucía Pérez",
    "email": "lucia@notaria-ejemplo.es",
    "company": "Notaría Pérez",
    "phone": "+34 600 000 000",
    "segment": "notaria",
    "interest": "renting",
    "message": "Queremos información del renting para 3 despachos.",
    "consent": True,
}


def test_products_and_plans():
    with TestClient(app) as c:
        products = c.get("/api/products").json()
        assert products[0]["sku"] == "EPR-X1" and float(products[0]["price"]) == 499.0
        assert {p["id"] for p in c.get("/api/plans").json()} == {"renting", "mantenimiento"}


def test_contact_ok():
    with TestClient(app) as c:
        r = c.post("/api/contact", json=VALID)
        assert r.status_code == 201 and r.json()["id"] >= 1


def test_contact_requires_consent_and_valid_email():
    with TestClient(app) as c:
        assert c.post("/api/contact", json={**VALID, "consent": False}).status_code == 422
        assert c.post("/api/contact", json={**VALID, "email": "no-es-email"}).status_code == 422


def test_honeypot_is_not_stored():
    with TestClient(app) as c:
        r = c.post("/api/contact", json={**VALID, "website": "http://spam"})
        assert r.status_code == 201 and r.json()["id"] is None
