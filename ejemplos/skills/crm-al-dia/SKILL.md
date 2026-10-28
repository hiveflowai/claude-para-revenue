---
name: crm-al-dia
description: Mantiene el CRM al día después de cada interacción con una cuenta (correo enviado, respuesta, reunión): registra la nota, mueve la etapa con evidencia y deja el siguiente paso con fecha. Úsala cuando el usuario pida actualizar, registrar o limpiar el CRM o el pipeline.
---

# El CRM al día, y que diga por qué

Un CRM en el que nadie confía no sirve. Cada cambio que hagas debe poder explicarse en una línea.

## Herramientas

Usa las herramientas del CRM conectado por MCP. Con el conector de ejemplo de este repo son `buscar_cuentas`, `registrar_nota` y `mover_etapa`. Siempre busca la cuenta antes de escribir: nunca crees una duplicada.

## Procedimiento

1. **Encuentra la cuenta** por nombre o dominio. Si hay dos parecidas, pregunta cuál antes de tocar nada.
2. **Registra la nota:** qué pasó, quién, cuándo, en 1 o 2 frases.
3. **Mueve la etapa solo con evidencia:**
   - `contactado`: se envió el primer mensaje.
   - `reunion`: hay fecha y hora confirmadas por el cliente.
   - `propuesta`: se envió una propuesta con precio.
   - `ganado` o `perdido`: el cliente lo dijo por escrito.
   Si la evidencia no alcanza, deja la etapa como está y dilo.
4. **Siguiente paso:** agrega una nota que empiece con «Siguiente:» con qué hacer y para cuándo.

## Reglas

- Nunca borres notas ni cuentas.
- Nunca muevas a `ganado` o `perdido` sin una frase del cliente que lo diga; cítala.
- Al terminar, resume en una tabla: cuenta · etapa antes → después · motivo.
