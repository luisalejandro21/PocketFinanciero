# ADR-003 - Datos derivados

## Estado

Aceptado

---

## Contexto

PocketFinanciero debe mostrar información como:

- Saldo total.
- Dinero disponible.
- Gastos del mes.
- Ahorro acumulado.

Estos valores pueden obtenerse a partir de la información existente en las cuentas y movimientos.

Guardar estos datos directamente en la base de datos aumentaría el riesgo de inconsistencias y desincronización.

---

## Decisión

PocketFinanciero no almacenará datos derivados cuando estos puedan calcularse a partir de la información existente.

Toda la información financiera calculada será generada por el backend en tiempo real.

---

## Ejemplos

No se almacenarán campos como:

- saldo_total
- gastos_mes
- ahorro_total
- dinero_disponible

Estos valores serán calculados utilizando:

- Saldo inicial de las cuentas.
- Movimientos registrados.
- Transferencias.
- Ajustes.

---

## Consecuencias

### Ventajas

- Información siempre consistente.
- Menor riesgo de errores.
- Modelo de datos más limpio.
- Lógica centralizada en el backend.

### Desventajas

- Mayor procesamiento durante las consultas.
- Será necesario optimizar consultas complejas en el futuro.