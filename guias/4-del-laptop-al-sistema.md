# 4 · Del laptop al sistema

**Escalón 5 · Sistema.** El agente del escalón 4 funciona… en tu laptop. El día que lo quieres para tu equipo comercial aparecen los problemas:

- 💻 Si apagas la computadora, se detiene.
- ⏰ Nadie lo dispara si no estás. Y no reacciona a eventos: entra un lead o escribe un cliente.
- 🙈 No pide permiso antes de enviar.
- 📜 No deja bitácora de qué hizo y por qué.
- 👥 Tu equipo no lo puede usar.
- 🔑 Hay llaves sueltas por todos lados.
- 🏖 Si te vas de vacaciones, él también.

## Lo que necesita un sistema de agentes

| Pieza | Para qué |
|---|---|
| **Disparadores** | Arranca cuando pasa algo: un horario, un lead nuevo, un WhatsApp, un formulario, un cambio en el CRM. |
| **Aprobación humana** | Se detiene donde importa (precio, descuento, un cliente grande) y te pregunta donde estés. Apruebas de un toque y sigue. |
| **Permisos** | Cada agente solo con las herramientas que necesita. Aprobar lo hace una persona con sesión, nunca una llave de API ni otro agente. |
| **Bitácora** | Quién aprobó, cuándo, qué se envió y cuánto costó. |
| **Memoria** | El siguiente ciclo sabe lo que pasó en el anterior. |
| **Equipo** | Lo usan todos, no solo quien lo programó. |

## El patrón de la charla, en tres agentes

```
⚡ entra una cuenta / 9 a.m.
   → 🔎 Agente 1 · investiga la cuenta y quién decide        (skill investigar-cuenta)
   → ✍️ Agente 2 · un correo por persona según su rol         (skill correo-por-rol)
   → 🙋 ¿menciona precio? te pregunta antes de enviar
   → 📇 Agente 3 · registra todo y deja el CRM al día        (skill crm-al-dia)
```

**La IA propone. Tú decides. Y queda escrito.**

## Con Hiveflow

[Hiveflow](https://hiveflow.ai) es el sistema operativo de agentes para el escalón 5. Arma el flujo visual (disparador → agente con Claude → herramientas por MCP → aprobación → CRM) y aprueba desde la web, iOS, Android, Mac, Windows o Linux.

Conecta tu Claude o Claude Code a tu cuenta de Hiveflow por MCP para crear y correr flujos desde el chat:

```bash
claude mcp add --transport http hiveflow https://mcp.hiveflow.ai
```

En la app de Claude: **Personalizar → Conectores → Agregar conector personalizado → `https://mcp.hiveflow.ai`**.

## Qué hacer el lunes

1. **Conecta a Claude.** Un Proyecto con tu contexto ([plantilla de CLAUDE.md](../ejemplos/claude-md/CLAUDE.md)) y un conector a tu CRM o Sheets. Ya subiste dos escalones.
2. **Un proceso, un agente.** Toma tus 50 cuentas objetivo y automatiza solo la investigación. Mídelo: tiempo por cuenta antes y después.
3. **Llévalo a un sistema** cuando deba correr solo, con aprobación, bitácora y para todo el equipo.
