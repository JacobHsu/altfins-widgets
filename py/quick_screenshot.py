#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快速截圖腳本 - 簡化版
一鍵截圖多個 altfins-widgets 頁面
"""

from screenshot_script import ScreenshotTaker

def main():
    """快速截圖主要加密貨幣的 1H 圖表"""
    
    print("🚀 快速截圖 - Altfins Widgets")
    print("=" * 50)
    
    # 預設的加密貨幣列表（1小時圖表）
    crypto_urls = [
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/ETH#1H",
            "name": "ETH_1H"
        },
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/BTC#1H", 
            "name": "BTC_1H"
        },
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/SOL#1H",
            "name": "SOL_1H"
        },
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/ADA#1H",
            "name": "ADA_1H"
        },
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/DOGE#1H",
            "name": "DOGE_1H"
        },
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/XRP#1H",
            "name": "XRP_1H"
        },
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/BNB#1H",
            "name": "BNB_1H"
        },
        {
            "url": "https://jacobhsu.github.io/altfins-widgets/SUI#1H",
            "name": "SUI_1H"
        }
    ]
    
    # 創建截圖工具
    screenshot_tool = ScreenshotTaker(
        output_dir="crypto_screenshots",
        wait_time=12  # 12秒等待時間，平衡速度和載入完整性
    )
    
    try:
        # 執行批量截圖
        print(f"📸 準備截圖 {len(crypto_urls)} 個加密貨幣圖表...")
        successful_screenshots = screenshot_tool.batch_screenshot(crypto_urls)
        
        # 顯示結果摘要
        print(f"\n🎉 截圖完成！")
        print(f"✅ 成功: {len(successful_screenshots)} 個")
        print(f"📁 保存位置: crypto_screenshots/")
        
        if successful_screenshots:
            print(f"\n📋 成功截圖的文件:")
            for i, path in enumerate(successful_screenshots, 1):
                filename = path.split('/')[-1] if '/' in path else path.split('\\')[-1]
                print(f"  {i:2d}. {filename}")
                
    except KeyboardInterrupt:
        print("\n⚠️ 用戶取消操作")
    except Exception as e:
        print(f"\n❌ 執行錯誤: {e}")
    finally:
        screenshot_tool.close()

if __name__ == "__main__":
    main()