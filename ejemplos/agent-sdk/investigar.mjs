// Agente investigador con el Claude Agent SDK: el mismo ciclo de Claude Code, dentro de tu código.
// Investiga una cuenta en la web y deja la nota en el mini CRM (el conector MCP de ../conector-mcp).
//
//   npm install
//   export ANTHROPIC_API_KEY=...        (o tu sesión de Claude Code ya iniciada)
//   node investigar.mjs andina "Andina Logística"
import { query } from "@anthropic-ai/claude-agent-sdk";
import { fileURLToPath } from "node:url";

const [id, empresa] = process.argv.slice(2);
if (!id || !empresa) {
  console.error('Uso: node investigar.mjs <id-en-el-crm> "<Nombre de la empresa>"');
  process.exit(1);
}

const crm = fileURLToPath(new URL("../conector-mcp/server.js", import.meta.url));

const prompt = `Investiga la empresa «${empresa}» (id ${id} en el mini CRM).
1. Qué hace, a quién le vende y su tamaño aproximado.
2. Por qué ahora: noticias, vacantes o cambios de los últimos 90 días.
3. Quién decide la compra (puesto, no inventes nombres).
Luego registra un resumen de 2 frases con registrar_nota y mueve la cuenta a "investigado" con mover_etapa.
Si no encuentras algo, escribe "sin dato". No inventes cifras.
Al final responde SOLO un JSON: {"empresa","que_hace","por_que_ahora","quien_decide","fuentes":[urls]}`;

for await (const msg of query({
  prompt,
  options: {
    // Solo las herramientas que necesita: buscar en la web y su CRM. Nada de Bash ni de editar archivos.
    allowedTools: [
      "WebSearch",
      "WebFetch",
      "mcp__mini-crm__buscar_cuentas",
      "mcp__mini-crm__registrar_nota",
      "mcp__mini-crm__mover_etapa",
    ],
    mcpServers: { "mini-crm": { command: "node", args: [crm] } },
    maxTurns: 20,
  },
})) {
  if (msg.type === "assistant") {
    for (const b of msg.message.content) if (b.type === "tool_use") console.error(`🛠  ${b.name}`);
  }
  if (msg.type === "result") {
    if (msg.subtype === "success") console.log(msg.result);
    else console.error("El agente no terminó:", msg.subtype);
    console.error(`(${msg.num_turns} vueltas · ~${msg.total_cost_usd.toFixed(3)} USD)`);
  }
}
