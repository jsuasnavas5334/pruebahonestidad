@echo off
chcp 65001 >nul
title EL CHISMOSO - Test Honestidad
cd /d "%~dp0"

where node >nul 2>nul
if not %errorlevel%==0 (
  echo.
  echo   EL CHISMOSO necesita Node para correr, y no lo encuentro.
  echo   Instalalo desde https://nodejs.org y vuelve a ejecutar esto.
  echo.
  pause
  exit /b
)

node chismoso.mjs
echo.
pause
