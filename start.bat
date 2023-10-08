@echo off

REM Function to check if a port is in use and kill the associated process
:check_and_kill
setlocal
set "PORT=%1"
set "PID="
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /r /c:":%PORT%"') do (
    tasklist /FI "PID eq %%a" | find ":" >nul 2>&1
    if errorlevel 1 (
        set "PID=%%a"
    )
)

if defined PID (
    echo Port %PORT% is already in use. Killing the process with PID %PID%...
    taskkill /F /PID %PID%
)
endlocal

REM Start the Spring Boot projects in separate command windows
start cmd /k "cd generator && mvnw spring-boot:run"
start cmd /k "cd validator && mvnw spring-boot:run"

REM Start the React app
start cmd /k "cd frontend && npm start"
