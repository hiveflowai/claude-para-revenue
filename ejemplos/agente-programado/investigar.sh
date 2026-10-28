#!/usr/bin/env bash
# Agente programado "hecho en casa": Claude Code en modo headless (claude -p) + un horario (cron).
# Lee cuentas.txt (una empresa por línea), investiga cada una y guarda un JSON por cuenta en salida/.
#
#   chmod +x investigar.sh && ./investigar.sh            # a mano
#   crontab -e  →  0 10 * * 1-5 /ruta/a/investigar.sh    # lunes a viernes, 10 a.m.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p salida

# cron corre con un PATH mínimo: asegúrate de que encuentre claude (ajusta la ruta: `which claude`).
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
export LC_ALL=en_US.UTF-8   # y un locale UTF-8 para los acentos

while IFS= read -r empresa; do
  [[ -z "$empresa" || "$empresa" == \#* ]] && continue
  archivo="salida/$(echo "$empresa" | sed 'y/áéíóúüñÁÉÍÓÚÜÑ/aeiouunAEIOUUN/' | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-').json"
  [[ -s "$archivo" ]] && continue   # ya investigada

  echo "→ $empresa"
  claude -p "Investiga «$empresa»: qué hacen, por qué ahora y quién decide. No inventes: si no hay dato, escribe \"sin dato\". Entrega SOLO un JSON con las llaves empresa, que_hace, por_que_ahora, quien_decide, fuentes." \
    --allowedTools WebSearch WebFetch \
    --output-format json \
    > "$archivo.tmp" && mv "$archivo.tmp" "$archivo"
done < cuentas.txt

echo "Listo: $(ls salida/*.json 2>/dev/null | wc -l | tr -d ' ') cuentas en salida/"
