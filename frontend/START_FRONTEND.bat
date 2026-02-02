@echo off
echo ====================================
echo Starting Frontend Web Server
echo ====================================
echo.
echo Your website will open at: http://localhost:8080/travel.html
echo.
cd /d "%~dp0"
start http://localhost:8080/travel.html
python -m http.server 8080
pause
