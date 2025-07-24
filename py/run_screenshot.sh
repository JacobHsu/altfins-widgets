#!/bin/bash

echo "🚀 啟動加密貨幣截圖工具..."
echo

# 檢查 Python 是否安裝
if ! command -v python3 &> /dev/null; then
    echo "❌ 未找到 Python3，請先安裝 Python 3.7+"
    exit 1
fi

# 安裝依賴（如果需要）
echo "📦 檢查並安裝依賴..."
python3 install_dependencies.py

echo
echo "📸 開始截圖..."
echo

# 執行截圖腳本
python3 quick_screenshot.py

echo
echo "✅ 截圖完成！"