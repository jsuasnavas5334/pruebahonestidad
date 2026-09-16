@echo off
REM ============================================================================
REM subir_a_git.bat
REM Version para Windows del script para guardar el avance del proyecto en Git
REM y subirlo al repositorio remoto (GitHub). Hermano de subir_a_git.sh (para
REM Mac/Linux/Git Bash) - hacen exactamente lo mismo, cada uno en su sistema.
REM
REM COMO USARLO:
REM   Doble clic sobre este archivo (o "Ejecutar como administrador" si Windows
REM   lo pide). Se puede correr cada vez que quieras guardar y subir el avance
REM   mas reciente. Requiere tener Git para Windows instalado
REM   (https://git-scm.com/download/win) - si ya pudiste clonar o commitear
REM   este repositorio antes, ya lo tienes.
REM
REM QUE HACE:
REM   - Si esta carpeta todavia no es un repositorio Git, lo inicializa.
REM   - Agrega todos los archivos nuevos o modificados (respetando .gitignore).
REM   - Si hay cambios, crea un commit con la fecha y hora como mensaje.
REM   - Si el repositorio ya esta conectado a un remoto (origin), sube los
REM     cambios automaticamente (git push) - incluso si el unico pendiente
REM     era un commit hecho antes, sin cambios nuevos hoy. Si no esta
REM     conectado, te da las 3 instrucciones para conectarlo una sola vez.
REM
REM NOTA: el archivo CONFIDENCIAL_Formulas_Calculo_IGI.docx esta excluido por
REM defecto en .gitignore (contiene los pesos y multiplicadores exactos del
REM modelo). Revisa el comentario en .gitignore antes de incluirlo. Si vas a
REM dar acceso a este repositorio a alguien mas (por ejemplo, para el
REM desarrollo del software), confirma primero que el repositorio en GitHub
REM sea PRIVADO y que solo las personas correctas tengan acceso.
REM ============================================================================

setlocal enabledelayedexpansion
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
    echo No se encontro "git" en este equipo.
    echo Instala Git para Windows desde https://git-scm.com/download/win y vuelve a intentar.
    pause
    exit /b 1
)

if not exist ".git" (
    echo Inicializando repositorio Git en esta carpeta...
    git init
    echo Repositorio inicializado.
    echo.
)

git add -A

git diff --cached --quiet
if errorlevel 1 (
    for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set FECHA=%%a-%%b-%%c
    set HORA=%time:~0,5%
    set MENSAJE=Avance del proyecto - %date% %HORA%
    git commit -m "%MENSAJE%"
    echo.
    echo Cambios guardados localmente en Git.
    echo.
) else (
    echo No hay cambios nuevos para guardar localmente.
    echo.
)

git remote get-url origin >nul 2>nul
if errorlevel 1 (
    echo Este repositorio TODAVIA NO esta conectado a GitHub/GitLab/etc.
    echo Para conectarlo, hazlo UNA SOLA VEZ con estos pasos ^(en esta misma ventana^):
    echo.
    echo   1. Crea un repositorio vacio en GitHub ^(o GitLab/Bitbucket^), sin
    echo      README ni licencia ^(para que quede vacio^). Si otras personas van
    echo      a trabajar en el software, marcalo como PRIVADO.
    echo   2. Copia la URL que te da ^(algo como https://github.com/tu-usuario/tu-repo.git^).
    echo   3. Ejecuta, reemplazando la URL:
    echo        git branch -M main
    echo        git remote add origin URL_DE_TU_REPOSITORIO
    echo        git push -u origin main
    echo.
    echo   Despues de eso, cada vez que corras este script se subira automaticamente.
) else (
    echo Subiendo los cambios al repositorio remoto...
    git push
    if errorlevel 1 (
        echo.
        echo No se pudo subir automaticamente. Es probable que falte iniciar sesion
        echo en Git/GitHub en este equipo, o que haya cambios nuevos en el remoto
        echo que primero hay que traer con: git pull
    ) else (
        echo.
        echo Listo: cambios guardados y subidos a GitHub.
    )
)

echo.
pause
