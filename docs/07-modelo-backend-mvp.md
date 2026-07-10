# Modelo Backend MVP

## Objetivo

Definir la organización del backend de PocketFinanciero para la versión MVP.

La arquitectura está basada en Django y sigue una separación por dominios funcionales.

---

# Estructura

backend/

├── apps/
│   ├── users/
│   ├── accounts/
│   ├── categories/
│   ├── transactions/
│   ├── budgets/
│   ├── goals/
│   ├── dashboard/
│   └── recommendations/
│
├── config/
├── requirements/
├── tests/
└── manage.py

---

# Responsabilidad de cada aplicación

## Users

Gestiona:

- Registro.
- Inicio de sesión.
- Perfil.
- Preferencias del usuario.

---

## Accounts

Gestiona:

- Cuentas bancarias.
- Efectivo.
- Cuentas de ahorro.
- Saldo inicial.

---

## Categories

Gestiona:

- Categorías de ingresos.
- Categorías de gastos.
- Categorías personalizadas.

---

## Transactions

Gestiona:

- Ingresos.
- Gastos.
- Transferencias.
- Ajustes.

Es el núcleo financiero del sistema.

---

## Budgets

Gestiona presupuestos mensuales por categoría.

Ejemplo:

- Alimentación: $200.000
- Transporte: $80.000

---

## Goals

Gestiona metas de ahorro.

Ejemplo:

- Viaje.
- Auto.
- Fondo de emergencia.

---

## Dashboard

No almacena datos.

Calcula:

- Dinero disponible.
- Gastos del mes.
- Ahorros.
- Indicadores.
- Estado financiero.

---

## Recommendations

Genera recomendaciones inteligentes utilizando la información financiera del usuario.

Ejemplos:

- Puedes ahorrar más este mes.
- Tus gastos en comida aumentaron un 15%.
- Vas bien con tu presupuesto.

---

# Flujo del sistema

Usuario

↓

Account

↓

Transaction

↓

Dashboard

↓

Recommendations

---

# Principios de diseño

- Cada aplicación tiene una única responsabilidad.
- Los datos derivados no se almacenan.
- Toda la lógica de negocio reside en el backend.
- El frontend solo consume la API.
- El sistema debe ser fácilmente escalable.

---

# Estado del MVP

✅ Users

✅ Accounts

✅ Categories

✅ Transactions

⬜ Budgets

⬜ Goals

⬜ Dashboard Service

⬜ Recommendation Service