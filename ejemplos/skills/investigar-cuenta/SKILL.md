---
name: investigar-cuenta
description: Investiga una empresa prospecto y entrega un expediente de una página (qué hace, por qué ahora, quién decide, cómo entrar). Úsala cuando el usuario pida investigar, perfilar o preparar una cuenta, un prospecto o una empresa antes de escribirle o de una reunión.
---

# Investigar una cuenta

Entregas un expediente que un vendedor lee en 2 minutos antes de escribirle a la cuenta.

## Entrada

El nombre de la empresa o su dominio. Si solo hay nombre y es ambiguo (varias empresas se llaman igual), pregunta el país o el dominio antes de seguir.

## Procedimiento

1. **Fuentes, en este orden:** su sitio (inicio, «nosotros», productos, clientes), noticias de los últimos 90 días, vacantes abiertas, perfil de LinkedIn de la empresa y lo que publican sus directivos.
2. **Qué hace:** a quién le vende, qué vende y su tamaño aproximado (empleados, sedes). Una frase cada uno.
3. **Por qué ahora:** busca una señal de compra concreta. Lee [senales.md](senales.md) para saber qué cuenta como señal. Si no hay ninguna, dilo.
4. **Quién decide:** el puesto que firma y el que sufre el problema. Pon nombres solo si aparecen en una fuente pública, con la fuente.
5. **Fit:** califica de 0 a 100 con la tabla de [senales.md](senales.md) y explica el número en una línea.
6. **Cómo entrar:** el ángulo del primer mensaje en una frase, amarrado a la señal del paso 3.

## Reglas

- Nunca inventes cifras, nombres ni clientes. Si no encuentras algo, escribe «sin dato».
- Cada afirmación importante lleva su fuente (URL).
- Nada de adjetivos de folleto («líder», «innovadora»): hechos.

## Formato de salida

```markdown
# <Empresa> · fit <0-100>
**Qué hace:** …
**Por qué ahora:** … (fuente)
**Quién decide:** <puesto> · **Quién sufre el problema:** <puesto>
**Cómo entrar:** …
**Fuentes:** 1. … 2. …
```
