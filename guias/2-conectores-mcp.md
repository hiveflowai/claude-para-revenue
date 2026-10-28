# 2 · Conectores: cómo conectar Claude a tus herramientas (MCP)

**Escalón 3 · Herramientas.** Con una Skill, Claude sabe *cómo* hacer el trabajo. Con un conector, *puede hacerlo*: lee tu CRM, escribe en tu Sheets, prepara el correo. Deja de copiar y pegar.

**MCP (Model Context Protocol)** es el estándar abierto para eso: el USB-C de la IA. Claude es el cliente y cada herramienta pone un **servidor MCP** que ofrece tres cosas:

| | Qué es | Ejemplo |
|---|---|---|
| 🛠 Herramientas | Acciones que Claude ejecuta | crear un deal, mandar un correo |
| 📄 Recursos | Datos que se leen | la ficha de una cuenta |
| 💡 Prompts | Plantillas listas | «resumen del pipeline» |

## Conectar uno que ya existe

### En Claude (app, web y móvil)

1. **Personalizar → Conectores.** Ahí están los oficiales (Gmail, Calendar, Drive, Slack, Notion…): activas y autorizas.
2. Para cualquier otro: **Agregar conector personalizado** → pega la URL del servidor (por ejemplo `https://mcp.hiveflow.ai`) → inicia sesión y autoriza. Sin contraseñas: es OAuth y se revoca desde el mismo lugar.

### En Claude Code (terminal)

```bash
# Servidor remoto (HTTP)
claude mcp add --transport http hiveflow https://mcp.hiveflow.ai

# Servidor local (un programa en tu computadora)
claude mcp add mini-crm -- node /ruta/a/ejemplos/conector-mcp/server.js

# Para todo el equipo: se guarda en .mcp.json del proyecto (súbelo a git)
claude mcp add --scope project --transport http hiveflow https://mcp.hiveflow.ai
```

Dentro de la sesión, `/mcp` muestra los conectados, su estado y te deja autorizar los que piden inicio de sesión. Luego solo pregunta: *«¿Qué deals se movieron esta semana?»*.

### El tip de seguridad

Al autorizar, **lee los verbos** de la pantalla de permisos (ver, crear, enviar, eliminar) y da solo lo que la tarea necesita. Un agente que investiga no necesita «enviar».

## Hacer tu propio conector

Cuando tu herramienta no tiene servidor MCP (un CRM interno, una base de datos, tu ERP), lo haces tú. Son ~100 líneas. El de este repo es un **mini CRM** sobre un archivo JSON: [ejemplos/conector-mcp/server.js](../ejemplos/conector-mcp/server.js).

```bash
cd ejemplos/conector-mcp
npm install
npm run inspector     # abre el MCP Inspector para probarlo sin Claude
claude mcp add mini-crm -- node "$PWD/server.js"
```

La pieza clave es registrar cada herramienta con un **nombre**, una **descripción** y un **esquema** de entrada:

```js
server.registerTool(
  "mover_etapa",
  {
    title: "Mover etapa",
    description: "Cambia la etapa de una cuenta. Solo muévela cuando haya evidencia y di cuál en 'motivo'.",
    inputSchema: { id: z.string(), etapa: z.enum(ETAPAS), motivo: z.string().min(3) },
  },
  async ({ id, etapa, motivo }) => { /* … tu lógica … */ return { content: [{ type: "text", text: "listo" }] }; }
);
```

### Reglas para un buen conector

1. **La descripción es el manual de Claude.** Di qué hace, cuándo usarla y qué *no* hacer («solo con evidencia»). Claude elige la herramienta leyendo eso.
2. **Herramientas pequeñas y con verbo:** `buscar_cuentas`, `registrar_nota`, `mover_etapa`. Mejor tres claras que una `crm` que hace todo.
3. **Valida la entrada** con el esquema (`z.enum` para etapas, `min(3)` para motivos): Claude se equivoca menos cuando el esquema no le deja.
4. **Errores que enseñan:** devuelve `isError: true` con qué hacer («No existe la cuenta. Usa buscar_cuentas.»). Claude lee el error y se corrige solo.
5. **Lectura y escritura separadas:** así puedes dar solo las de lectura a un agente que investiga.
6. **Nunca pongas llaves en el código.** Pásalas por variables de entorno: `claude mcp add mi-crm -e CRM_TOKEN=… -- node server.js`.
7. **Local o remoto:** local (stdio, como este) para ti; remoto (HTTP con OAuth) cuando lo va a usar un equipo o la app de Claude.

Documentación del protocolo y SDKs en otros lenguajes (Python, etc.): [modelcontextprotocol.io](https://modelcontextprotocol.io).

Siguiente: [3 · Agentes y horarios](3-agentes-y-horarios.md)
