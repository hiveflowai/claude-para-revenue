#!/usr/bin/env node
// Conector MCP mínimo: un "mini CRM" guardado en cuentas.json.
// Da a Claude 3 herramientas (buscar, registrar nota, mover etapa), 1 recurso y 1 prompt.
// Úsalo en Claude Code:  claude mcp add mini-crm -- node /ruta/a/server.js
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const DB = process.env.MINI_CRM_FILE || fileURLToPath(new URL("./cuentas.json", import.meta.url));
const ETAPAS = ["nuevo", "investigado", "contactado", "reunion", "propuesta", "ganado", "perdido"];

const leer = () => JSON.parse(readFileSync(DB, "utf8"));
const guardar = (cuentas) => writeFileSync(DB, JSON.stringify(cuentas, null, 2) + "\n");
const texto = (t) => ({ content: [{ type: "text", text: typeof t === "string" ? t : JSON.stringify(t, null, 2) }] });

const server = new McpServer({ name: "mini-crm", version: "1.0.0" });

// 🛠 Herramientas: acciones que Claude puede ejecutar.
// La descripción es lo que Claude lee para decidir cuándo usarla: escríbela para él, no para ti.
server.registerTool(
  "buscar_cuentas",
  {
    title: "Buscar cuentas",
    description: "Busca cuentas del CRM por nombre o dominio. Sin texto, devuelve todas. Úsala antes de registrar o mover una cuenta para obtener su id.",
    inputSchema: { texto: z.string().optional().describe("Parte del nombre o del dominio, p. ej. 'andina'") },
  },
  async ({ texto: q = "" }) => {
    const s = q.toLowerCase();
    return texto(leer().filter((c) => !s || c.nombre.toLowerCase().includes(s) || c.dominio.includes(s)));
  }
);

server.registerTool(
  "registrar_nota",
  {
    title: "Registrar nota",
    description: "Agrega una nota con fecha a una cuenta (resumen de investigación, correo enviado, respuesta). Escribe qué pasó y por qué importa.",
    inputSchema: { id: z.string().describe("id de la cuenta"), nota: z.string().min(3).describe("La nota, en una o dos frases") },
  },
  async ({ id, nota }) => {
    const cuentas = leer();
    const c = cuentas.find((x) => x.id === id);
    if (!c) return { ...texto(`No existe la cuenta ${id}. Usa buscar_cuentas.`), isError: true };
    c.notas.push({ fecha: new Date().toISOString().slice(0, 10), nota });
    guardar(cuentas);
    return texto(`Nota registrada en ${c.nombre}.`);
  }
);

server.registerTool(
  "mover_etapa",
  {
    title: "Mover etapa",
    description: "Cambia la etapa de una cuenta. Solo muévela cuando haya evidencia (una respuesta, una reunión agendada) y di cuál en 'motivo'.",
    inputSchema: {
      id: z.string(),
      etapa: z.enum(ETAPAS),
      motivo: z.string().min(3).describe("La evidencia del cambio"),
    },
  },
  async ({ id, etapa, motivo }) => {
    const cuentas = leer();
    const c = cuentas.find((x) => x.id === id);
    if (!c) return { ...texto(`No existe la cuenta ${id}.`), isError: true };
    const antes = c.etapa;
    c.etapa = etapa;
    c.notas.push({ fecha: new Date().toISOString().slice(0, 10), nota: `Etapa ${antes} → ${etapa}: ${motivo}` });
    guardar(cuentas);
    return texto(`${c.nombre}: ${antes} → ${etapa}.`);
  }
);

// 📄 Recurso: datos que Claude (o tú) pueden leer sin ejecutar nada.
server.registerResource(
  "cuenta",
  new ResourceTemplate("crm://cuentas/{id}", { list: undefined }),
  { title: "Cuenta del CRM", description: "Ficha completa de una cuenta", mimeType: "application/json" },
  async (uri, { id }) => ({ contents: [{ uri: uri.href, text: JSON.stringify(leer().find((c) => c.id === id) || null, null, 2) }] })
);

// 💡 Prompt: una plantilla lista que el usuario elige desde el menú de Claude.
server.registerPrompt(
  "resumen_pipeline",
  { title: "Resumen del pipeline", description: "Pide un resumen del pipeline por etapa con los siguientes pasos" },
  () => ({
    messages: [{
      role: "user",
      content: { type: "text", text: "Usa buscar_cuentas sin texto y dame el pipeline agrupado por etapa: cuántas cuentas hay en cada una, cuáles llevan más de 7 días sin nota y cuál es el siguiente paso de cada una. No inventes datos." },
    }],
  })
);

await server.connect(new StdioServerTransport());
