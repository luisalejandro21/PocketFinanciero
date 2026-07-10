# ADR-004 - Modelo de usuario

## Estado

Aceptado

---

## Contexto

Django utiliza por defecto un modelo de usuario basado en un nombre de usuario (username).

PocketFinanciero utilizará el correo electrónico como identificador principal para simplificar el proceso de autenticación y mejorar la experiencia del usuario.

---

## Decisión

Se implementará un modelo de usuario personalizado basado en AbstractUser.

Las principales modificaciones serán:

- Eliminación del campo username como identificador.
- Uso del correo electrónico como campo de autenticación.
- Incorporación de información propia del sistema financiero.

Campos adicionales:

- preferred_currency
- timezone
- created_at
- updated_at

---

## Consecuencias

### Ventajas

- Inicio de sesión más simple.
- Compatible con el sistema de autenticación de Django.
- Flexibilidad para futuras ampliaciones.

### Desventajas

- Requiere un UserManager personalizado.
- Debe definirse antes de generar migraciones importantes.