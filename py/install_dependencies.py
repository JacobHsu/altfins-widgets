#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自動安裝依賴腳本
"""

import subprocess
import sys
import os

def install_package(package):
    """安裝 Python 包"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        return True
    except subprocess.CalledProcessError:
        return False

def main():
    print("🚀 開始安裝截圖腳本依賴...")
    print("=" * 50)
    
    # 需要安裝的包
    packages = [
        "selenium>=4.0.0",
        "webdriver-manager>=3.8.0"
    ]
    
    success_count = 0
    
    for package in packages:
        print(f"📦 安裝 {package}...")
        if install_package(package):
            print(f"✅ {package} 安裝成功")
            success_count += 1
        else:
            print(f"❌ {package} 安裝失敗")
    
    print("\n" + "=" * 50)
    if success_count == len(packages):
        print("🎉 所有依賴安裝完成！")
        print("\n📋 接下來的步驟:")
        print("1. 確保已安裝 Chrome 瀏覽器")
        print("2. 運行: python screenshot_script.py")
    else:
        print(f"⚠️ 部分依賴安裝失敗 ({success_count}/{len(packages)})")
        print("請檢查網絡連接或手動安裝失敗的包")

if __name__ == "__main__":
    main()