@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title Subir al repositorio - pruebahonestidad
set "GIT_EDITOR=true"
set "GIT_TERMINAL_PROMPT=1"

echo.
echo ==================================================================
echo   SUBIR AL REPOSITORIO
echo   github.com/jsuasnavas5334/pruebahonestidad
echo ==================================================================
echo.

call :buscar_git
if not defined GIT goto :sin_git

"%GIT%" rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo  [X] Esta carpeta no es un repositorio git.
  echo      El .bat tiene que estar en la carpeta "Test Honestidad".
  goto :fin
)

REM ---------------------------------------------------------------- Word
REM Word y Excel dejan un archivo ~$ mientras el documento esta abierto.
REM Subir un .docx a medio guardar es subir una version que nadie escribio.
dir /b "~$*.doc*" >nul 2>nul && set "ABIERTO=1"
dir /b "~$*.xls*" >nul 2>nul && set "ABIERTO=1"
if defined ABIERTO (
  echo  [!] AVISO: tienes un Word o un Excel ABIERTO en esta carpeta.
  echo      Lo mejor es cerrarlo antes de subir.
  echo      Sigo en 8 segundos. Cierra esta ventana si quieres parar.
  timeout /t 8 >nul
  echo.
)

REM ------------------------------------------------------------- 1 - fetch
echo  [1/5] Preguntando a GitHub si hay algo nuevo...
"%GIT%" fetch origin --quiet
if errorlevel 1 (
  echo        [X] No pude contactar con GitHub.
  echo            Sin internet, o la invitacion al repo sin aceptar.
  goto :fin
)

REM --------------------------------------------------- 2 - que cambio aqui
echo  [2/5] Revisando que cambio en tu carpeta...
"%GIT%" add -A
set /a N=0
set "NOMBRES="
for /f "usebackq delims=" %%F in (`"%GIT%" diff --cached --name-only`) do (
  set /a N+=1
  if !N! LEQ 3 (
    for %%B in ("%%F") do set "CORTO=%%~nB"
    if defined NOMBRES (set "NOMBRES=!NOMBRES!, !CORTO!") else (set "NOMBRES=!CORTO!")
  )
)

if !N!==0 (
  echo        Nada modificado por ti.
  set "HAYCOMMIT="
) else (
  echo        !N! archivos:
  for /f "usebackq delims=" %%F in (`"%GIT%" diff --cached --name-only`) do echo           - %%F
  set "HAYCOMMIT=1"
)

REM -------------------------------------------------------- 3 - el commit
REM El mensaje sale de los archivos que cambiaron, no es "cambios".
REM Si le pasas uno tu, gana el tuyo:  subiralgit.bat "lo que hiciste"
if defined HAYCOMMIT (
  if "%~1"=="" (
    set "MSG=Actualiza !NOMBRES!"
    if !N! GTR 3 set "MSG=Actualiza !NOMBRES! y otros - !N! archivos"
  ) else (
    set "MSG=%~1"
  )
  echo  [3/5] Guardando: "!MSG!"
  "%GIT%" commit -q -m "!MSG!"
  if errorlevel 1 (
    echo        [X] El commit fallo.
    goto :fin
  )
) else (
  echo  [3/5] Sin commit nuevo que guardar.
)

REM ------------------------------------------------- 4 - integrar a George
echo  [4/5] Integrando lo de George...
"%GIT%" pull --no-rebase --no-edit origin main
if errorlevel 1 goto :conflicto

REM --------------------------------------------------------- 5 - el push
echo.
echo  [5/5] Subiendo a GitHub...
"%GIT%" push origin HEAD:main
if errorlevel 1 goto :sin_permiso

echo.
echo  ------------------------------------------------------------------
echo   LISTO. George ya lo ve.
echo  ------------------------------------------------------------------
echo    ultimo commit:
"%GIT%" log -1 --oneline
echo.
echo   Nota: Seeds_TestH y Test NO se suben nunca. Estan excluidos a
echo   proposito en .git\info\exclude, para no mandarle a George el
echo   sistema de diseno, las fuentes de Apple ni el PNG de 2,8 MB.
goto :fin


REM ==================================================================
:conflicto
echo.
echo  ------------------------------------------------------------------
echo   PARADO: hay un CONFLICTO. No se subio nada.
echo  ------------------------------------------------------------------
echo.
echo   George y tu tocaron el mismo archivo. Con un .docx git no puede
echo   fusionarlos: hay que elegir una version a mano.
echo.
echo   Archivos en conflicto:
for /f "usebackq delims=" %%F in (`"%GIT%" diff --name-only --diff-filter=U`) do echo      - %%F
echo.
echo   Que hacer, en orden:
echo     1. Copia TU version a otro nombre, fuera de esta carpeta.
echo     2. Vuelve a esta ventana y dime que archivo es; yo te lo
echo        desenredo, o lo abres en Word y comparas las dos.
echo     3. Cuando este unificado, vuelve a ejecutar este .bat.
echo.
echo   Nada se perdio: todo lo que alguna vez se subio es recuperable.
goto :fin

REM ==================================================================
:sin_permiso
echo.
echo  ------------------------------------------------------------------
echo   EL COMMIT SE GUARDO, PERO NO SE PUDO SUBIR.
echo  ------------------------------------------------------------------
echo.
echo   Tu trabajo esta a salvo en tu maquina. Lo que falta es permiso.
echo   Las dos causas posibles, por orden de probabilidad:
echo.
echo     1. La invitacion al repo sigue sin aceptar. Entra a:
echo        github.com/jsuasnavas5334/pruebahonestidad/invitations
echo.
echo     2. Tu cuenta de GitHub no esta conectada en esta maquina.
echo        Abre GitHub Desktop una vez y entra con tu cuenta. Queda
echo        guardado y este .bat ya no vuelve a pedirlo.
echo.
echo   Arregla eso y vuelve a ejecutar este .bat: el commit ya esta
echo   hecho, asi que solo hara el push.
goto :fin

REM ==================================================================
:sin_git
echo  [X] No encuentro git en esta maquina.
echo.
echo      Busque en:
echo        - el PATH
echo        - C:\Program Files\Git\cmd\git.exe
echo        - el git que trae GitHub Desktop
echo.
echo      Instala Git for Windows desde git-scm.com y vuelve a probar.
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
