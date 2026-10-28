# 1 · Cómo hacer una buena Skill

**Escalón 2 · Contexto.** Una Skill es un instructivo que le enseñas a Claude **una vez** y que repite igual siempre. Es una carpeta con un archivo `SKILL.md` (y, si hace falta, más archivos de apoyo).

```
investigar-cuenta/
├── SKILL.md      ← nombre, cuándo usarla y el procedimiento
└── senales.md    ← detalle que Claude lee solo cuando lo necesita
```

## Anatomía de `SKILL.md`

```markdown
---
name: investigar-cuenta
description: Investiga una empresa prospecto y entrega un expediente de una página. Úsala cuando el usuario pida investigar, perfilar o preparar una cuenta antes de escribirle.
---

# Investigar una cuenta
1. …el procedimiento, paso a paso…
## Reglas
## Formato de salida
```

- **`name`**: minúsculas, números y guiones (máximo 64 caracteres). Es como la llamas: `/investigar-cuenta`.
- **`description`**: lo más importante de toda la Skill. Claude solo ve esta línea de todas tus Skills y con ella decide cuál usar. Debe decir **qué hace y cuándo usarla**, con las palabras que el usuario diría («investigar», «perfilar», «prospecto»). Máximo 1,024 caracteres.
- **El cuerpo**: el procedimiento. Claude lo carga completo solo cuando decide usar la Skill.

## Las 7 reglas de una buena Skill

1. **Un proceso por Skill.** «Investigar una cuenta» sí; «todo lo de ventas» no. Si tiene dos objetivos, son dos Skills.
2. **La descripción es para Claude, no para ti.** Escribe los disparadores reales: «Úsala cuando el usuario pida…». Si Claude no la usa cuando debía, casi siempre falta una palabra en la descripción.
3. **Pasos numerados y verificables.** «Busca noticias de los últimos 90 días» es mejor que «investiga a fondo».
4. **Reglas explícitas de lo que no debe hacer.** «Nunca inventes cifras; si no hay dato, escribe "sin dato"». Las reglas negativas son las que más evitan errores.
5. **Un formato de salida exacto.** Un ejemplo con la forma del resultado: así puedes conectarlo a otra cosa (otra Skill, un CRM, un flujo).
6. **Corto arriba, detalle abajo.** Mantén `SKILL.md` en menos de ~500 líneas. Lo que no siempre hace falta (tablas, catálogos, ejemplos largos) va en archivos aparte que el `SKILL.md` enlaza: Claude los abre solo si los necesita y no gasta contexto.
7. **Pruébala con casos reales y ajústala.** Pídele 3 tareas reales, mira dónde se equivoca y agrega la regla que faltaba. Una Skill buena se escribe en 10 minutos y se afina en 3 usos.

> Truco: pídele a Claude que la escriba. «Te acabo de mostrar cómo investigo una cuenta. Conviértelo en una Skill con su SKILL.md siguiendo buenas prácticas.» Luego tú la editas.

## Dónde se instala

### En Claude (app, web y escritorio)

1. **Personalizar → Skills.** Ahí activas las de Anthropic (documentos, hojas, presentaciones…) o agregas la tuya.
2. Para subir la tuya: comprime la carpeta (`investigar-cuenta.zip`, con el `SKILL.md` adentro) y súbela, o créala desde ahí mismo.
3. Para el contexto fijo de tu negocio (catálogo, precios, tono) usa **Proyectos → Instrucciones y Conocimiento**.

### En Claude Code (terminal)

```
tu-proyecto/
├── CLAUDE.md                              ← lo lee siempre, al empezar cada sesión
└── .claude/skills/
    └── investigar-cuenta/SKILL.md         ← una Skill del proyecto (se comparte con git)
```

- **Del proyecto:** `.claude/skills/<nombre>/SKILL.md`. Todo el que clone el repo la tiene.
- **Personales (todas tus carpetas):** `~/.claude/skills/<nombre>/SKILL.md`.
- Claude la usa sola cuando la tarea coincide con la descripción, o la llamas con `/investigar-cuenta`.
- `CLAUDE.md` es el contexto permanente (quiénes son, tono, reglas). Hay una plantilla en [ejemplos/claude-md/CLAUDE.md](../ejemplos/claude-md/CLAUDE.md).

```bash
# Instala las 3 Skills de este repo como personales
mkdir -p ~/.claude/skills && cp -R ejemplos/skills/* ~/.claude/skills/
```

## Las Skills de ejemplo

| Skill | Qué hace |
|---|---|
| [investigar-cuenta](../ejemplos/skills/investigar-cuenta/SKILL.md) | Expediente de una cuenta: qué hace, por qué ahora, quién decide, fit. Con un archivo de señales que ajustas a tu negocio. |
| [correo-por-rol](../ejemplos/skills/correo-por-rol/SKILL.md) | Un primer mensaje por persona según su rol; se detiene si menciona precio. |
| [crm-al-dia](../ejemplos/skills/crm-al-dia/SKILL.md) | Registra cada interacción y mueve etapas solo con evidencia. |

Siguiente: [2 · Conectores (MCP)](2-conectores-mcp.md)
