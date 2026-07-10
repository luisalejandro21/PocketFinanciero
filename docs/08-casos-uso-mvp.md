# Casos de Uso MVP — PocketFinanciero

## Objetivo

Definir los flujos principales que debe soportar PocketFinanciero en su MVP.

El objetivo no es solo registrar datos, sino permitir que el usuario entienda su situación financiera y tome mejores decisiones.

---

# CU-01 — Registrarse

## Pregunta que responde

¿Cómo creo mi espacio financiero personal?

## Actor

Usuario nuevo.

## Flujo principal

1. El usuario ingresa nombre, apellido, correo y contraseña.
2. El sistema crea la cuenta de usuario.
3. El sistema crea categorías predeterminadas.
4. El sistema redirige al usuario al onboarding inicial.

## Resultado esperado

El usuario queda registrado y listo para configurar su primera cuenta.

---

# CU-02 — Crear primera cuenta

## Pregunta que responde

¿Dónde está mi dinero?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario ingresa el nombre de la cuenta.
2. Selecciona el tipo de cuenta.
3. Ingresa institución financiera opcional.
4. Ingresa saldo inicial.
5. El sistema guarda la cuenta.

## Resultado esperado

El usuario tiene una cuenta financiera inicial desde la cual se calculará su dinero disponible.

---

# CU-03 — Registrar ingreso

## Pregunta que responde

¿Cuánto dinero entró?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario selecciona la cuenta.
2. Ingresa el monto.
3. Selecciona categoría de ingreso.
4. Ingresa descripción opcional.
5. Guarda el movimiento.

## Resultado esperado

El ingreso queda registrado y aumenta el saldo calculado de la cuenta.

---

# CU-04 — Registrar gasto

## Pregunta que responde

¿En qué se fue mi dinero?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario selecciona la cuenta.
2. Ingresa el monto.
3. Selecciona categoría de gasto.
4. Ingresa descripción opcional.
5. Guarda el movimiento.

## Resultado esperado

El gasto queda registrado y disminuye el saldo calculado de la cuenta.

---

# CU-05 — Consultar dashboard

## Pregunta que responde

¿Cómo estoy hoy?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario entra al dashboard.
2. El backend calcula dinero disponible.
3. Calcula ahorros.
4. Calcula gastos del mes.
5. Calcula estado financiero.
6. Genera una recomendación principal.

## Resultado esperado

El usuario entiende su situación financiera en pocos segundos.

## Información mostrada

- Dinero disponible.
- Ahorros actuales.
- Gastos del mes.
- Estado financiero.
- Recomendación principal.
- Últimos movimientos.

---

# CU-06 — Consultar movimientos

## Pregunta que responde

¿Qué movimientos he realizado?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario entra a movimientos.
2. El sistema lista sus movimientos.
3. El usuario puede filtrar por fecha, cuenta, categoría o tipo.

## Resultado esperado

El usuario puede revisar su historial financiero.

---

# CU-07 — Crear categoría

## Pregunta que responde

¿Cómo quiero clasificar mi dinero?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario ingresa nombre de categoría.
2. Selecciona tipo: ingreso, gasto o ambos.
3. Define color o icono opcional.
4. Guarda la categoría.

## Resultado esperado

El usuario puede personalizar la forma en que clasifica sus movimientos.

---

# CU-08 — Editar movimiento

## Pregunta que responde

¿Cómo corrijo un registro equivocado?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario selecciona un movimiento.
2. Modifica monto, cuenta, categoría, fecha o descripción.
3. Guarda los cambios.

## Resultado esperado

Los cálculos financieros se actualizan con la información corregida.

---

# CU-09 — Eliminar o cancelar movimiento

## Pregunta que responde

¿Qué hago si registré algo por error?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario selecciona un movimiento.
2. El sistema permite cancelarlo.
3. El movimiento queda con estado CANCELLED.

## Resultado esperado

El movimiento no afecta los cálculos financieros principales.

---

# CU-10 — Consultar saldo de cuentas

## Pregunta que responde

¿Dónde está mi dinero?

## Actor

Usuario autenticado.

## Flujo principal

1. El usuario entra a Cuentas.
2. El sistema muestra cada cuenta.
3. El backend calcula el saldo actual de cada una.

## Resultado esperado

El usuario entiende cómo está distribuido su dinero.