@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title Comprobar el repositorio - pruebahonestidad
set "GIT_EDITOR=true"

set "FORZAR="
if /i "%~1"=="/forzar" set "FORZAR=1"

echo.
echo ==================================================================
echo   COMPROBAR EL REPOSITORIO
echo   tu carpeta   contra   github.com/jsuasnavas5334/pruebahonestidad
echo ==================================================================
echo.

call :buscar_git
if not defined GIT goto :sin_git

"%GIT%" rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo  [X] Esta carpeta no es un repositorio git.
  goto :fin
)

echo  Preguntando a GitHub...
"%GIT%" fetch origin --quiet
if errorlevel 1 (
  echo  [X] No pude contactar con GitHub. Sin internet, o sin permiso.
  goto :fin
)
echo.

REM ============================================== EL INFORME, ANTES DE TOCAR
for /f "usebackq delims=" %%C in (`"%GIT%" rev-list --count HEAD..origin/main`) do set "DETRAS=%%C"
for /f "usebackq delims=" %%C in (`"%GIT%" rev-list --count origin/main..HEAD`) do set "ADELANTE=%%C"
set /a SUCIOS=0
for /f "usebackq delims=" %%F in (`"%GIT%" status --porcelain`) do set /a SUCIOS+=1

echo  ------------------------------------------------------------------
echo   1. LO QUE GEORGE SUBIO Y TU NO TIENES
echo  ------------------------------------------------------------------
if "!DETRAS!"=="0" (
  echo      Nada. Estas al dia con el.
) else (
  echo      !DETRAS! commits nuevos. Archivos que trae:
  for /f "usebackq delims=" %%F in (`"%GIT%" diff --name-only HEAD..origin/main`) do echo         - %%F
  echo.
  echo      Y lo que dijo:
  for /f "usebackq delims=" %%L in (`"%GIT%" log --oneline HEAD..origin/main`) do echo         %%L
)
echo.

echo  ------------------------------------------------------------------
echo   2. COMMITS TUYOS QUE NO ESTAN EN GITHUB
echo  ------------------------------------------------------------------
if "!ADELANTE!"=="0" (
  echo      Ninguno.
) else (
  echo      !ADELANTE! commits sin subir. Usa subiralgit.bat.
  for /f "usebackq delims=" %%L in (`"%GIT%" log --oneline origin/main..HEAD`) do echo         %%L
)
echo.

echo  ------------------------------------------------------------------
echo   3. CAMBIOS TUYOS SIN GUARDAR EN NINGUN COMMIT
echo  ------------------------------------------------------------------
if !SUCIOS!==0 (
  echo      Ninguno. La carpeta esta limpia.
) else (
  echo      !SUCIOS! archivos. ESTO es lo unico fragil de todo el asunto:
  echo      lo que nunca se commiteo no se puede recuperar.
  for /f "usebackq tokens=1,*" %%A in (`"%GIT%" -c core.quotepath^=false status --porcelain`) do echo         [%%A] %%~B
)
echo.

dir /b "~$*.doc*" >nul 2>nul && set "ABIERTO=1"
dir /b "~$*.xls*" >nul 2>nul && set "ABIERTO=1"
if defined ABIERTO (
  echo  ------------------------------------------------------------------
  echo   4. AVISO
  echo  ------------------------------------------------------------------
  echo      Tienes un Word o un Excel ABIERTO en esta carpeta. Cierralo
  echo      antes de bajar nada: Word bloquea el archivo y la descarga
  echo      puede fallar a medias.
  echo.
)

REM ==================================================== AHORA SI, IGUALAR
echo  ==================================================================
echo   IGUALAR LA CARPETA
echo  ==================================================================
echo.

if defined FORZAR goto :forzar

if not !SUCIOS!==0 (
  echo   NO TOCO NADA, y es a proposito.
  echo.
  echo   Tienes !SUCIOS! archivos modificados sin guardar. Bajar encima
  echo   de eso es como se pierde una tarde de trabajo, asi que este
  echo   .bat no lo hace solo. Elige:
  echo.
  echo     a^) Si lo que cambiaste vale  ...... subiralgit.bat
  echo        Lo guarda, lo integra con lo de George y lo sube.
  echo.
  echo     b^) Si lo que cambiaste NO vale  ... comprobarrepo.bat /forzar
  echo        Deja tu carpeta EXACTAMENTE igual a GitHub. Antes hace
  echo        una copia de todo lo modificado en _respaldo_fecha\,
  echo        asi que tampoco ahi se pierde nada.
  goto :fin
)

if "!DETRAS!"=="0" (
  echo   Ya esta igual. No hay nada que bajar.
  goto :fin
)

if not "!ADELANTE!"=="0" (
  echo   Las dos copias avanzaron por su lado: !ADELANTE! commits tuyos
  echo   y !DETRAS! de George. Eso no se iguala bajando, se FUSIONA.
  echo   Usa subiralgit.bat, que hace las dos cosas en el orden bueno.
  goto :fin
)

echo   Carpeta limpia y !DETRAS! commits de George por bajar. Bajando...
echo.
"%GIT%" merge --ff-only origin/main
if errorlevel 1 (
  echo.
  echo   [X] No se pudo bajar de forma limpia. Nada cambio.
  echo       Dime que salio y lo miro.
  goto :fin
)
echo.
echo   LISTO. Tu carpeta es identica a la de GitHub.
goto :fin


REM ==================================================================
:forzar
echo   MODO FORZAR: tu carpeta va a quedar EXACTAMENTE igual a GitHub.
echo.
if !SUCIOS!==0 (
  echo   No hay nada modificado, asi que no hace falta respaldo.
) else (
  set "STAMP="
  for /f "usebackq delims=" %%T in (`powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmm"`) do set "STAMP=%%T"
  if not defined STAMP set "STAMP=sin_fecha"
  set "RESP=_respaldo_!STAMP!"
  echo   Copiando tus !SUCIOS! archivos modificados a  !RESP!\
  mkdir "!RESP!" 2>nul
  for /f "usebackq tokens=1,*" %%A in (`"%GIT%" status --porcelain`) do (
    if exist "%%B" echo F | xcopy /y /q "%%B" "!RESP!\%%B" >nul
  )
  echo   Hecho. Ahi queda tu version, por si acaso.
)
echo.
echo   Igualando con GitHub...
"%GIT%" reset --hard origin/main
if errorlevel 1 (
  echo   [X] Fallo. Nada garantizado: dime que salio.
  goto :fin
)
echo.
echo   LISTO. Carpeta identica a GitHub.
echo.
echo   Lo que NO se borro, a proposito: los archivos que tu creaste y
echo   nunca estuvieron en el repo. Siguen ahi. Si sobra alguno, lo
echo   borras a mano tu, que es una decision tuya y no de un .bat.
goto :fin

REM ==================================================================
:sin_git
echo  [X] No encuentro git en esta maquina.
echo      Busque en el PATH, en C:\Program Files\Git y en el git que
echo      trae GitHub Desktop. Instala Git for Windows de git-scm.com.
goto :fin

REM ==================================================================
:buscar_git
set "GIT="
for /f "usebackq delims=" %%G in (`where git 2^>nul`) do if not defined GIT set "GIT=%%G"
if defined GIT exit /b
REM   OJO: `if exist X set A & exit /b` NO vale. El & termina el if, asi que
REM   el `exit /b` se ejecutaria SIEMPRE y la cadena de busqueda se cortaria
REM   en el primer sitio donde no estuviera. Un if por renglon, sin &.
if exist "%ProgramFiles%\Git\cmd\git.exe" set "GIT=%ProgramFiles%\Git\cmd\git.exe"
if defined GIT exit /b
REM   Y `%ProgramFiles(x86)%` lleva parentesis en el NOMBRE, que revientan
REM   cualquier bloque ( ... ). Se guarda en una variable limpia primero.
set "P86=%ProgramFiles(x86)%"
if exist "%P86%\Git\cmd\git.exe" set "GIT=%P86%\Git\cmd\git.exe"
if defined GIT exit /b
for /d %%D in ("%LOCALAPPDATA%\GitHubDesktop\app-*") do (
  if exist "%%D\resources\app\git\cmd\git.exe" set "GIT=%%D\resources\app\git\cmd\git.exe"
)
exit /b

REM ==================================================================
:fin
echo.
echo ==================================================================
pause
endlocal
