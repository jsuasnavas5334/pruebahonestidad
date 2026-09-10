#!/bin/bash
# ============================================================================
# subir_a_git.sh
# Script para guardar el avance del proyecto en Git y subirlo a un repositorio
# remoto (GitHub, GitLab, Bitbucket, etc.).
#
# CÓMO USARLO:
#   1. Abre una Terminal en tu computadora.
#   2. Ubícate DENTRO de esta carpeta (Proyecto_Nuevo_Instrumento), por ejemplo:
#        cd "~/Desktop/Software MITAI/Proyecto_Nuevo_Instrumento"
#   3. Ejecuta:
#        bash subir_a_git.sh
#      Puedes ejecutarlo cada vez que quieras guardar el avance más reciente;
#      la primera vez además inicializa el repositorio.
#   4. La PRIMERA vez, para conectarlo a un repositorio remoto (GitHub/GitLab),
#      sigue las instrucciones que este script imprime al final.
#
# QUÉ HACE:
#   - Si esta carpeta todavía no es un repositorio Git, lo inicializa (git init).
#   - Agrega todos los archivos nuevos o modificados (respetando .gitignore).
#   - Crea un "commit" (una foto fija del estado actual del proyecto) con la
#     fecha y hora como mensaje.
#   - Si ya conectaste un repositorio remoto, te recuerda el comando para subirlo.
#
# NOTA: el archivo CONFIDENCIAL_Formulas_Calculo_IGI.docx está excluido por
# defecto en .gitignore (contiene los pesos y multiplicadores exactos del
# modelo). Revisa el comentario en .gitignore antes de incluirlo.
# ============================================================================

set -e

if [ ! -d ".git" ]; then
  echo "Inicializando repositorio Git en esta carpeta..."
  git init
  echo "Repositorio inicializado."
  echo ""
fi

git add -A

if git diff --cached --quiet 2>/dev/null; then
  echo "No hay cambios nuevos para guardar."
  exit 0
fi

MENSAJE="Avance del proyecto - $(date '+%Y-%m-%d %H:%M')"
git commit -m "$MENSAJE"

echo ""
echo "Cambios guardados localmente en Git (commit: \"$MENSAJE\")."
echo ""

if git remote get-url origin >/dev/null 2>&1; then
  echo "Este repositorio ya está conectado a un remoto. Para subir los cambios:"
  echo "  git push"
else
  echo "Este repositorio TODAVÍA NO está conectado a GitHub/GitLab/etc."
  echo "Para conectarlo, hazlo UNA SOLA VEZ con estos pasos:"
  echo ""
  echo "  1. Crea un repositorio vacío en GitHub (o GitLab/Bitbucket), sin"
  echo "     README ni licencia (para que quede vacío)."
  echo "  2. Copia la URL que te da (algo como https://github.com/tu-usuario/tu-repo.git)."
  echo "  3. Ejecuta, reemplazando la URL:"
  echo "       git branch -M main"
  echo "       git remote add origin <URL_DE_TU_REPOSITORIO>"
  echo "       git push -u origin main"
  echo ""
  echo "  Después de eso, cada vez que corras este script solo necesitarás"
  echo "  ejecutar además: git push"
fi
