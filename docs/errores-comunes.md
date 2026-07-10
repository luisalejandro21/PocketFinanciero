# Errores encontrados

## Google Chrome Translate

Problema:
El Dashboard mostraba datos inconsistentes (a veces $1.000.000 y luego "Cargando...").

Causa:
La traducción automática de Google Chrome modificaba el DOM de React.

Solución:
Desactivar la traducción automática para localhost.

Aprendizaje:
Las extensiones o traductores pueden alterar el DOM y provocar comportamientos inesperados en aplicaciones React.