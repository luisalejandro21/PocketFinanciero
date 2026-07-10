# ADR-001 — Stack tecnológico inicial

## Estado

Aceptado

## Contexto

PocketFinanciero será una aplicación de finanzas personales con separación entre frontend, backend y base de datos.

El sistema debe ser mantenible, escalable y adecuado para un proyecto profesional de portafolio.

## Decisión

Se utilizará el siguiente stack tecnológico:

- Backend: Django
- API: Django REST Framework
- Frontend: React
- Base de datos: PostgreSQL
- Autenticación: JWT
- Control de versiones: Git + GitHub

## Motivos

Django permite construir un backend robusto y ordenado.

Django REST Framework facilita la creación de una API REST profesional.

React permite construir una interfaz moderna y componentizada.

PostgreSQL es una base de datos sólida y ampliamente usada en proyectos reales.

JWT permite proteger endpoints privados y separar correctamente frontend y backend.

## Consecuencias

El proyecto tendrá una arquitectura separada por capas.

La lógica financiera vivirá en el backend.

El frontend será responsable de mostrar información y consumir la API.

La base de datos almacenará información relacional del usuario, cuentas, movimientos, categorías, presupuestos y metas.