@echo off
chcp 65001 >nul
cls
color 1F

echo ==================================
echo.
echo  _____   _______ _______ _______ _______ _______        _______ _______
echo ^|     ^|_^|    ___^|   _   ^|     __^|   ^|   ^|    ___^|______^|    ___^|   ^|   ^|
echo ^|       ^|    ___^|       ^|    ^|  ^|   ^|   ^|    ___^|______^|    ___^|       ^|
echo ^|_______^|_______^|___^|___^|_______^|_______^|_______^|      ^|___^|   ^|__^|_^|__^|
echo.
echo ==================================
echo        Discord Rich Presence v1.0.0
echo        Created By: itsdevjace
echo ==================================
echo.
echo Hey! Welkom bij de League-FM RPC installer.
echo We gaan alles stap voor stap instellen.
echo.
echo ==================================
echo.

echo [1/4] Controleren of Node.js aanwezig is...
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js niet gevonden.
    echo Download via: https://nodejs.org
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js gevonden: %NODE_VERSION%
echo.

echo [2/4] Dependencies installeren...
echo.
call npm install --silent
if %errorlevel% neq 0 (
    echo Installatie mislukt. Controleer je internetverbinding.
    pause
    exit /b 1
)
echo Dependencies geinstalleerd
echo.

echo [3/4] Discord configuratie instellen...
echo.
echo Je hebt een Discord Application ID nodig.
echo.
echo Hoe je deze maakt:
echo 1. Ga naar: discord.com/developers/applications
echo 2. Klik op "New Application"
echo 3. Naam: LeagueFM ^| Mixxx
echo 4. Kopieer de "Application ID"
echo 5. Plak deze hieronder
echo.
echo Geef je Application ID NOOIT aan anderen!
echo.
set /p DISCORD_ID="Voer uw Discord Application ID in: "
echo.

if "%DISCORD_ID%"=="" (
    echo Geen ID ingevoerd.
    pause
    exit /b 1
)

echo.
set /p DISCORD_NAME="Voer je naam in (dit is voor te checken of je DJ bent bij leagueFM!): "
echo.

echo [4/4] Configuratie opslaan en start.bat aanmaken...
echo.

node -e "require('fs').writeFileSync('.env', 'DISCORD_CLIENT_ID=%DISCORD_ID%\nDISCORD_NAME=%DISCORD_NAME%\nUPDATE_INTERVAL=15000\n', 'utf8'); console.log('  [OK] .env opgeslagen');"

node create-start.js

echo.
echo ==================================
echo.
echo  [OK] Dependencies geinstalleerd
echo  [OK] .env opgeslagen
echo  [OK] start.bat aangemaakt
echo.
echo  Dubbelklik op START.BAT om te beginnen!
echo.
echo ==================================
echo.
echo Druk op een toets om af te sluiten.
pause >nul
