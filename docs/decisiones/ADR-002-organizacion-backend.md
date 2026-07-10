# ADR-002 — Organización del backend

## Estado

Aceptado

## Contexto

PocketFinanciero necesita un backend ordenado, mantenible y preparado para crecer.

El proyecto tendrá varias áreas de dominio, como usuarios, cuentas, categorías, movimientos, presupuestos, metas y recomendaciones.

## Decisión

El backend se organizará con la siguiente estructura:

```txt
backend/
├── apps/
├── config/
├── core/
├── requirements/
└── tests/