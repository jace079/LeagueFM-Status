/**
 * =============================================
 *   Created By: Jace (itsdevjace)
 *   GitHub: https://github.com/jace079/league-fm-rpc
 * =============================================
 */

const fs = require("fs");

const content = `@echo off
chcp 65001 >nul
cls
color 1F
echo.
echo  ==================================
echo.
echo   _____   _______ _______ _______ _______ _______        _______ _______
echo  ^|     ^|_^|    ___^|   _   ^|     __^|   ^|   ^|    ___^|______^|    ___^|   ^|   ^|
echo  ^|       ^|    ___^|       ^|    ^|  ^|   ^|   ^|    ___^|______^|    ___^|       ^|
echo  ^|_______^|_______^|___^|___^|_______^|_______^|_______^|      ^|___^|   ^|__^|_^|__^|
echo.
echo  ==================================
echo         Discord Rich Presence v1.0.0
echo         Created By: itsdevjace
echo  ==================================
echo.
echo  League-FM RPC wordt gestart...
echo  Zorg dat Discord open is!
echo.
echo  ==================================
echo.
node index.js
pause
`;

fs.writeFileSync("start.bat", content, "utf8");
console.log("  [OK] start.bat aangemaakt");
