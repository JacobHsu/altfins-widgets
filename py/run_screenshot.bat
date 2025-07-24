@echo off
echo 🚀 啟動加密貨幣截圖工具...
echo.

REM 檢查 Python 是否安裝
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到 Python，請先安裝 Python 3.7+
    pause
    exit /b 1
)

REM 安裝依賴（如果需要）
echo 📦 檢查並安裝依賴...
python install_dependencies.py

echo.
echo 📸 開始截圖...
echo.

REM 執行截圖腳本
python quick_screenshot.py

echo.
echo ✅ 截圖完成！按任意鍵退出...
pause