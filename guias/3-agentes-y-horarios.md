# 3 · Cómo hacer un agente (y ponerle horario)

**Escalón 4 · Agente.** Un chat da una vuelta. Un agente da las vueltas que necesite:

```
🎯 Objetivo  →  🧠 Piensa  →  🛠 Actúa  →  👀 Observa  →  ¿terminé?  — no → otra vuelta
   (qué, no cómo)  (¿qué hago ahora?)  (web · CRM · archivos)  (¿qué obtuve?)    — sí → ✅ entrega
```

Un agente es **un comando + algo que lo arranca**. Sin horario ni evento es un comando que corres tú; con eso, trabaja cuando no estás.

## Las 4 lecciones

1. 📝 **El prompt es el proceso.** Escríbelo como a un analista nuevo: objetivo, pasos, qué no hacer y cómo entregar. (O, mejor, que use una [Skill](1-skills.md).)
2. 🔐 **Solo las herramientas que necesita.** Un investigador necesita la web y leer el CRM; no necesita enviar correos ni borrar.
3. 🧾 **Salida en JSON.** Así la conectas a lo que sea: un Sheets, un CRM, otro agente.
4. ⏰ **Algo lo arranca.** Un horario («lunes a viernes, 10 a.m.») o un evento (entra un lead).

## Opción A · En Claude: tareas programadas

1. **Programadas (Scheduled) → Nueva tarea.**
2. Escribe la instrucción como a un analista: *«Investiga los leads nuevos de mi CRM y déjame un borrador de correo para cada uno.»*
3. **Cuándo:** lunes a viernes, 10 a.m. Corre sola y te avisa con el resultado. Usa los conectores que ya autorizaste.

## Opción B · En Claude Code: `/schedule`

Dentro de una sesión:

```
> /schedule lunes a viernes 10 a.m.: investiga los leads nuevos y déjame los correos listos
```

Crea una tarea programada que corre en la nube con tu repo, tus Skills y tus conectores, aunque apagues la computadora.

## Opción C · Hecho en casa: `claude -p` + cron

`claude -p` corre Claude Code sin interfaz: recibe el prompt, trabaja hasta terminar y entrega el resultado.

```bash
claude -p "Investiga «Andina Logística»: qué hacen, por qué ahora y quién decide. No inventes. Entrega JSON." \
  --allowedTools WebSearch WebFetch \
  --output-format json
```

- `--allowedTools`: la lista exacta de herramientas que puede usar (lección 2). Las del conector se llaman `mcp__<servidor>__<herramienta>`, por ejemplo `mcp__mini-crm__registrar_nota`.
- `--output-format json`: la respuesta llega en el campo `result`, junto con el costo y las vueltas.

Para ponerle horario, el script [ejemplos/agente-programado/investigar.sh](../ejemplos/agente-programado/investigar.sh) recorre `cuentas.txt` y guarda un JSON por cuenta. Luego en `crontab -e`:

```cron
# minuto hora día mes día-de-la-semana  →  lunes a viernes, 10:00
0 10 * * 1-5 /ruta/a/ejemplos/agente-programado/investigar.sh >> /tmp/investigar.log 2>&1
```

Ojo: cron solo corre si la computadora está prendida (ver [4 · Del laptop al sistema](4-del-laptop-al-sistema.md)).

## Opción D · Dentro de tu propio código: Claude Agent SDK

El mismo ciclo de Claude Code, como librería (TypeScript o Python), para meterlo en tus sistemas. El ejemplo [ejemplos/agent-sdk/investigar.mjs](../ejemplos/agent-sdk/investigar.mjs) investiga una cuenta en la web y la registra en el mini CRM por MCP:

```js
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const msg of query({
  prompt: "Investiga «Andina Logística» y registra la nota en el CRM…",
  options: {
    allowedTools: ["WebSearch", "WebFetch", "mcp__mini-crm__registrar_nota", "mcp__mini-crm__mover_etapa"],
    mcpServers: { "mini-crm": { command: "node", args: ["../conector-mcp/server.js"] } },
    maxTurns: 20,
  },
})) {
  if (msg.type === "result" && msg.subtype === "success") console.log(msg.result);
}
```

```bash
cd ejemplos/agent-sdk && npm install
node investigar.mjs andina "Andina Logística"
```

## ¿Cuál uso?

| Si quieres… | Usa |
|---|---|
| Que corra solo sin programar nada | A · Tareas programadas en Claude |
| Que use tu repo, Skills y conectores de Claude Code | B · `/schedule` |
| Control total en tu servidor, con tus archivos | C · `claude -p` + cron |
| Meterlo dentro de tu producto o sistema | D · Agent SDK |

Siguiente: [4 · Del laptop al sistema](4-del-laptop-al-sistema.md)
