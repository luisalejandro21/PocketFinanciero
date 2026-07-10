# Modelo Backend MVP — PocketFinanciero

## Objetivo

Definir las entidades iniciales que formarán la base del MVP de PocketFinanciero.

## Entidades iniciales

### User

Representa a la persona que utiliza la aplicación.

Responsabilidades:

- autenticarse
- administrar su información personal
- ser dueño de sus datos financieros

### Account

Representa un lugar donde el usuario tiene dinero.

Ejemplos:

- cuenta corriente
- cuenta vista
- efectivo
- cuenta de ahorro

Responsabilidades:

- almacenar saldo inicial
- representar el origen o destino de movimientos
- pertenecer a un usuario

### Category

Representa una clasificación para los movimientos.

Ejemplos:

- alimentación
- transporte
- sueldo
- salud
- entretenimiento

Responsabilidades:

- clasificar ingresos y gastos
- permitir análisis por categoría
- pertenecer a un usuario

### Transaction

Representa cualquier movimiento financiero.

Tipos iniciales:

- ingreso
- gasto
- transferencia
- ajuste

Responsabilidades:

- registrar entradas y salidas de dinero
- afectar el saldo de una cuenta
- alimentar reportes, presupuestos y recomendaciones

## Regla principal

La entidad central del sistema será `Transaction`.

Desde los movimientos se calcularán:

- saldo disponible
- gastos mensuales
- ingresos mensuales
- presupuesto usado
- evolución financiera
- recomendaciones futuras