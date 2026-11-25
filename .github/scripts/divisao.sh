#!/usr/bin/env bash
# Confere se quem enviou mexeu só na própria área do site.
# Uso: divisao.sh <conta-que-enviou> <commit-antes> <commit-depois>
# Imprime um arquivo por linha para cada arquivo fora da área (nada = tudo certo).
set -euo pipefail
QUEM="$1"; ANTES="$2"; DEPOIS="$3"

# Área do Thiago (conta ledixplugins): o app do synth e o PDF do manual.
# Tudo o que não estiver aqui é a área do Lednard (conta lednard-UI): o visual do site.
area_thiago() {
  case "$1" in
    synth/*|demo/*|aurasynthbass/AURA-Synth-Bass-Manual.pdf) return 0 ;;
    *) return 1 ;;
  esac
}

# Primeiro envio de um branch, ou histórico reescrito: compara só com o commit anterior.
if [[ "$ANTES" =~ ^0+$ ]] || ! git cat-file -e "$ANTES^{commit}" 2>/dev/null; then
  ANTES="$DEPOIS~1"
fi

git diff --name-only "$ANTES" "$DEPOIS" | while IFS= read -r arq; do
  case "$QUEM" in
    ledixplugins) if ! area_thiago "$arq"; then echo "$arq"; fi ;;
    lednard-UI)   if area_thiago "$arq"; then echo "$arq"; fi ;;
    *)            echo "$arq" ;;   # conta que não está na divisão: avisa tudo
  esac
done
exit 0
