# ADR-005 - Categorías iniciales del sistema

## Estado

Aceptado

---

## Contexto

Uno de los principales problemas de las aplicaciones de finanzas personales es que requieren una configuración inicial extensa.

Muchos usuarios abandonan la aplicación porque deben crear manualmente todas sus categorías antes de comenzar a registrar movimientos.

PocketFinanciero busca reducir la fricción durante el proceso de incorporación (onboarding).

---

## Decisión

Al registrarse por primera vez, cada usuario recibirá automáticamente un conjunto de categorías predeterminadas.

Estas categorías podrán:

- Editarse.
- Desactivarse.
- Utilizarse inmediatamente.
- Complementarse con categorías personalizadas creadas por el usuario.

---

## Categorías predeterminadas

### Ingresos

- Sueldo
- Bonos
- Freelance
- Inversiones
- Otros ingresos

### Gastos

- Alimentación
- Transporte
- Vivienda
- Servicios básicos
- Salud
- Educación
- Entretenimiento
- Compras
- Mascotas
- Viajes
- Deudas
- Otros gastos

---

## Consecuencias

### Ventajas

- Menor tiempo de configuración inicial.
- Mejor experiencia de usuario.
- Permite comenzar a registrar movimientos inmediatamente.
- Reduce el abandono durante el onboarding.

### Desventajas

- Será necesario crear automáticamente estas categorías cuando un usuario se registre.
- Será necesario mantener una lista base de categorías del sistema.