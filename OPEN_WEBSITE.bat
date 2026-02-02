@echo off
echo ============================================
echo   CAYA EXPRESS TRAVEL - Starting Servers
echo ============================================
echo.

echo [1/3] Starting Backend API Server...
start "Backend Server" cmd /k "cd /d C:\Users\Angel\Desktop\CA\caya-duffel-backend && node server.js"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend Web Server...
start "Frontend Server" cmd /k "cd /d C:\Users\Angel\Desktop\CA && npx http-server -p 8080 --cors"
timeout /t 5 /nobreak >nul

echo [3/3] Opening Website in Browser...
start http://127.0.0.1:8080/frontend/travel.html

echo.
echo ============================================
echo   SERVERS ARE RUNNING!
echo ============================================
echo   Backend:  http://localhost:3000
echo   Frontend: http://127.0.0.1:8080/frontend/travel.html
echo.
echo   Keep the command windows open!
echo   Press any key to close this window...
echo ============================================
pause >nul
