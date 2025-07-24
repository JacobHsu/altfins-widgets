#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快照腳本 - 對多個 URL 進行截圖並保存到本地資料夾
支援批量截圖 altfins-widgets 頁面
"""

import os
import time
import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import urlparse
from webdriver_manager.chrome import ChromeDriverManager

class ScreenshotTaker:
    def __init__(self, output_dir="screenshots", wait_time=10):
        """
        初始化截圖工具
        
        Args:
            output_dir (str): 截圖保存目錄
            wait_time (int): 頁面載入等待時間（秒）
        """
        self.output_dir = output_dir
        self.wait_time = wait_time
        self.driver = None
        
        # 創建輸出目錄
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            print(f"✅ 創建截圖目錄: {output_dir}")
    
    def setup_driver(self):
        """設置 Chrome WebDriver"""
        chrome_options = Options()
        
        # 設置瀏覽器選項
        chrome_options.add_argument('--headless')  # 無頭模式
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')  # 設置窗口大小
        chrome_options.add_argument('--disable-extensions')
        chrome_options.add_argument('--disable-plugins')
        # chrome_options.add_argument('--disable-images')  # 註釋掉，因為我們需要圖表
        
        # 設置用戶代理
        chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        
        try:
            # 使用 webdriver-manager 自動下載和管理 ChromeDriver
            service = Service(ChromeDriverManager().install())
            self.driver = webdriver.Chrome(service=service, options=chrome_options)
            print("✅ Chrome WebDriver 初始化成功")
            return True
        except Exception as e:
            print(f"❌ Chrome WebDriver 初始化失敗: {e}")
            print("請確保已安裝 Google Chrome 瀏覽器")
            return False
    
    def take_screenshot(self, url, filename=None):
        """
        對指定 URL 進行截圖
        
        Args:
            url (str): 要截圖的 URL
            filename (str): 自定義文件名（可選）
        
        Returns:
            str: 截圖文件路徑，失敗返回 None
        """
        if not self.driver:
            print("❌ WebDriver 未初始化")
            return None
        
        try:
            print(f"📸 開始截圖: {url}")
            
            # 訪問頁面
            self.driver.get(url)
            
            # 等待頁面載入
            print(f"⏳ 等待頁面載入 {self.wait_time} 秒...")
            time.sleep(self.wait_time)
            
            # 等待 TradingView 圖表載入（如果存在）
            try:
                WebDriverWait(self.driver, 15).until(
                    EC.presence_of_element_located((By.TAG_NAME, "iframe"))
                )
                print("✅ 檢測到 TradingView 圖表，額外等待載入...")
                time.sleep(5)  # 額外等待圖表完全載入
            except:
                print("ℹ️ 未檢測到 TradingView 圖表或載入超時")
            
            # 生成文件名
            if not filename:
                parsed_url = urlparse(url)
                timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                
                # 從 URL 提取有意義的部分
                path_parts = parsed_url.path.strip('/').split('/')
                fragment = parsed_url.fragment
                
                if path_parts and path_parts[-1]:
                    base_name = path_parts[-1]
                else:
                    base_name = parsed_url.netloc.replace('.', '_')
                
                if fragment:
                    base_name += f"_{fragment}"
                
                filename = f"{base_name}_{timestamp}.png"
            
            # 確保文件名安全
            filename = "".join(c for c in filename if c.isalnum() or c in "._-")
            if not filename.endswith('.png'):
                filename += '.png'
            
            # 截圖路徑
            screenshot_path = os.path.join(self.output_dir, filename)
            
            # 執行截圖
            success = self.driver.save_screenshot(screenshot_path)
            
            if success:
                print(f"✅ 截圖成功: {screenshot_path}")
                return screenshot_path
            else:
                print(f"❌ 截圖失敗: {url}")
                return None
                
        except Exception as e:
            print(f"❌ 截圖過程出錯: {e}")
            return None
    
    def batch_screenshot(self, urls):
        """
        批量截圖
        
        Args:
            urls (list): URL 列表，可以是字符串或字典格式
                       字符串格式: ["url1", "url2", ...]
                       字典格式: [{"url": "url1", "name": "name1"}, ...]
        
        Returns:
            list: 成功截圖的文件路徑列表
        """
        if not self.setup_driver():
            return []
        
        successful_screenshots = []
        total_urls = len(urls)
        
        print(f"🚀 開始批量截圖，共 {total_urls} 個 URL")
        print("=" * 50)
        
        for i, url_info in enumerate(urls, 1):
            print(f"\n📋 進度: {i}/{total_urls}")
            
            # 處理不同的輸入格式
            if isinstance(url_info, str):
                url = url_info
                filename = None
            elif isinstance(url_info, dict):
                url = url_info.get('url')
                filename = url_info.get('name')
            else:
                print(f"❌ 無效的 URL 格式: {url_info}")
                continue
            
            if not url:
                print(f"❌ URL 為空，跳過")
                continue
            
            # 執行截圖
            screenshot_path = self.take_screenshot(url, filename)
            if screenshot_path:
                successful_screenshots.append(screenshot_path)
            
            # 短暫休息避免過於頻繁的請求
            if i < total_urls:
                time.sleep(2)
        
        print("\n" + "=" * 50)
        print(f"🎉 批量截圖完成！")
        print(f"✅ 成功: {len(successful_screenshots)}/{total_urls}")
        print(f"📁 截圖保存在: {os.path.abspath(self.output_dir)}")
        
        return successful_screenshots
    
    def close(self):
        """關閉 WebDriver"""
        if self.driver:
            self.driver.quit()
            print("✅ WebDriver 已關閉")

def main():
    """主函數 - 示例用法"""
    
    # 定義要截圖的 URL 列表
    urls_to_screenshot = [
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
        }
    ]
    
    # 也可以使用簡單的字符串列表
    # urls_to_screenshot = [
    #     "https://jacobhsu.github.io/altfins-widgets/ETH#1H",
    #     "https://jacobhsu.github.io/altfins-widgets/BTC#1H",
    # ]
    
    # 創建截圖工具實例
    screenshot_tool = ScreenshotTaker(
        output_dir="crypto_screenshots",  # 截圖保存目錄
        wait_time=15  # 頁面載入等待時間
    )
    
    try:
        # 執行批量截圖
        successful_screenshots = screenshot_tool.batch_screenshot(urls_to_screenshot)
        
        # 顯示結果
        if successful_screenshots:
            print(f"\n📸 成功截圖的文件:")
            for path in successful_screenshots:
                print(f"  • {path}")
        else:
            print("\n❌ 沒有成功的截圖")
            
    except KeyboardInterrupt:
        print("\n⚠️ 用戶中斷操作")
    except Exception as e:
        print(f"\n❌ 執行過程中出錯: {e}")
    finally:
        # 確保關閉 WebDriver
        screenshot_tool.close()

if __name__ == "__main__":
    main()