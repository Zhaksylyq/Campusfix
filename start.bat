@echo off
cd /d "%~dp0"
where py >nul 2>&1
if %errorlevel%==0 (py -3 -X utf8 app.py) else (python -X utf8 app.py)
pause
