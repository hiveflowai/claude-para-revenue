# Claude para revenue: de chat a agente

**La guía de la charla de Jonathan Olvera, fundador de [Hiveflow](https://hiveflow.ai), en el Revenue Summit 2026.** Incluye cómo hacer una buena Skill, cómo conectar Claude a tus herramientas y hacer tu propio conector (MCP), y cómo hacer un agente que corra solo con horario. Todo funciona en Claude y en Claude Code, la terminal.

> La IA de hoy contesta. Todavía no trabaja. Esta guía es para que trabaje.

## La escalera de automatización

| | Escalón | Qué haces | Con qué | Guía |
|---|---|---|---|---|
| 1 | **Pregunta** | Le pides algo y copias la respuesta | Chat | — |
| 2 | **Contexto** | Le enseñas tu negocio y tu proceso una sola vez | Proyectos · Skills · CLAUDE.md | [1 · Skills](guias/1-skills.md) |
| 3 | **Herramientas** | Lee tu CRM, escribe en tu Sheets, prepara el correo | Conectores MCP | [2 · Conectores](guias/2-conectores-mcp.md) |
| 4 | **Agente** | Corre solo a una hora: «todos los días a las 10 a.m.» | Tareas programadas · `/schedule` · `claude -p` · Agent SDK | [3 · Agentes y horarios](guias/3-agentes-y-horarios.md) |
| 5 | **Sistema** | Arranca cuando pasa algo, pide aprobación, deja bitácora y lo usa el equipo | Sistema operativo de agentes | [4 · Del laptop al sistema](guias/4-del-laptop-al-sistema.md) |

## Claude no es un chat

| | Qué es | Para qué |
|---|---|---|
| 💬 **Claude** (app, web, escritorio, móvil) | Conversa, analiza archivos; con Proyectos ya conoce tu negocio | Escalones 1 a 4 sin programar |
| ⌨️ **Claude Code** | Trabaja en tu computadora: lee, escribe y ejecuta, no solo contesta | Escalones 2 a 4 desde la terminal |
| 🔌 **API · Agent SDK** | Lo metes dentro de tus propios sistemas | Escalón 4 dentro de tu producto |
| 🧩 **Skills** | Le enseñas un proceso una vez y lo repite igual siempre | Escalón 2 en todos los anteriores |

## Empieza en 5 minutos

```bash
git clone https://github.com/hiveflowai/claude-para-revenue && cd claude-para-revenue

# 1 · Instala las 3 Skills de ventas en tu Claude Code
mkdir -p ~/.claude/skills && cp -R ejemplos/skills/* ~/.claude/skills/

# 2 · Conecta el mini CRM de ejemplo (un conector MCP hecho en casa)
(cd ejemplos/conector-mcp && npm install)
claude mcp add mini-crm -- node "$PWD/ejemplos/conector-mcp/server.js"

# 3 · Pruébalo
claude
> investiga la cuenta Andina Logística y registra lo que encuentres en el mini CRM
```

## Qué hay en este repo

```
guias/
  1-skills.md                  cómo hacer una buena Skill (Claude y Claude Code)
  2-conectores-mcp.md          conectar conectores y hacer el tuyo
  3-agentes-y-horarios.md      tareas programadas, /schedule, claude -p + cron, Agent SDK
  4-del-laptop-al-sistema.md   aprobaciones, bitácora y equipo; qué hacer el lunes
ejemplos/
  skills/                      investigar-cuenta · correo-por-rol · crm-al-dia
  claude-md/CLAUDE.md          plantilla del contexto de tu equipo comercial
  conector-mcp/                servidor MCP de un mini CRM (3 herramientas, 1 recurso, 1 prompt)
  agente-programado/           claude -p + cron que investiga una lista de cuentas
  agent-sdk/                   el mismo agente con el Claude Agent SDK
```

Las empresas de los ejemplos (Andina Logística, Sierra Alimentos, Puerto Textil) son inventadas.

## Enlaces

- Documentación de Claude y Claude Code: [docs.claude.com](https://docs.claude.com)
- Protocolo MCP: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- Hiveflow: [hiveflow.ai](https://hiveflow.ai) · App: [app.hiveflow.ai](https://app.hiveflow.ai) · MCP: `https://mcp.hiveflow.ai`
- Agenda 20 minutos con Jonathan: [calendly.com/hiveflow](https://calendly.com/hiveflow/)
- Jonathan en [Instagram](https://instagram.com/johnolven), [TikTok](https://tiktok.com/@JohnOlven) y [LinkedIn](https://linkedin.com/in/johnolven)

---

Hecho con [Hiveflow](https://hiveflow.ai) para el Revenue Summit 2026. Uso libre (licencia MIT).
