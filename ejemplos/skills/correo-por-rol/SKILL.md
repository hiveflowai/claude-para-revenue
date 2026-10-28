---
name: correo-por-rol
description: Redacta el primer correo o mensaje de prospección para cada persona de una cuenta según su rol, a partir de un expediente. Úsala cuando el usuario pida escribir outreach, correos en frío, mensajes de LinkedIn o una secuencia para un prospecto.
---

# Un correo por persona

No es un correo con {nombre}. Cada persona recibe un mensaje sobre **su** problema.

## Entrada

Un expediente de la cuenta (el de la skill `investigar-cuenta` sirve tal cual) y la lista de personas con su puesto. Si falta el expediente, pídelo o investiga primero.

## Procedimiento

1. Para cada persona, decide qué le duele según su rol:
   - **Dirección general:** crecer sin contratar al mismo ritmo.
   - **Finanzas:** costo por venta y previsibilidad del ingreso.
   - **Ventas:** tiempo de su equipo en tareas que no son vender.
   - **Operaciones:** errores y retrabajo entre áreas.
2. Abre con la señal del expediente («vi que…»), no con tu empresa.
3. Una sola idea de valor, con un número si existe y es verificable.
4. Cierra con una pregunta fácil de contestar, no con «¿agendamos 30 minutos?».

## Reglas

- Máximo 90 palabras. Asunto de máximo 6 palabras, sin mayúsculas sostenidas ni emojis.
- Tono: el de un colega que hizo su tarea. Nada de «espero que te encuentres bien».
- **Detente y pide aprobación** si el correo menciona precio, descuento, un cliente por su nombre o una promesa de resultado. Marca esos correos con `⚠️ REVISAR` y di por qué.
- No inventes casos ni cifras. Si no tienes un dato, quita la frase.

## Formato de salida

Para cada persona:

```
Para: <nombre> · <puesto>
Asunto: …
<cuerpo>
[⚠️ REVISAR: motivo]   ← solo si aplica
```
