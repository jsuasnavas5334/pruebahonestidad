@echo off
chcp 65001 >nul
title Test Honestidad - el sistema
cd /d "%~dp0"

echo.
echo   ============================================================
echo     TEST HONESTIDAD - el muestrario
echo   ============================================================
echo.
echo   Abre index.html con un servidor local.
echo.
echo   POR QUE UN SERVIDOR Y NO DOBLE CLIC: las cinco tipografias
echo   se cargan con @font-face desde una ruta relativa, y abrir el
echo   archivo con file:// hace que algunos navegadores las
echo   bloqueen por origen. La pagina se veria con la letra del
echo   sistema y parecerian rotas sin estarlo.
echo.
echo   Para cerrar: Ctrl+C en esta ventana.
echo.

where node >nul 2>nul
if %errorlevel%==0 goto :node

where python >nul 2>nul
if %errorlevel%==0 goto :python

echo   No encuentro ni Node ni Python.
echo   Puedes abrir index.html a mano: se vera bien, solo cambia
echo   la tipografia.
echo.
pause
exit /b

:node
echo   Usando Node. Abriendo http://localhost:5173
echo.
start "" http://localhost:5173
npx --yes serve -l 5173 .
exit /b

:python
echo   Usando Python. Abriendo http://localhost:5173
echo.
start "" http://localhost:5173
python -m http.server 5173
exit /b
