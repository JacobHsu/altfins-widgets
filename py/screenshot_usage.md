# 📸 快照腳本使用指南

這個 Python 腳本可以自動對多個 altfins-widgets 頁面進行截圖並保存到本地資料夾。

## 🛠️ 安裝步驟

### 1. 安裝 Python 依賴
```bash
# 方法一：使用自動安裝腳本
python install_dependencies.py

# 方法二：手動安裝
pip install selenium>=4.0.0 webdriver-manager>=3.8.0

# 方法三：使用 requirements.txt
pip install -r requirements.txt
```

### 2. 安裝 Chrome 瀏覽器
確保系統已安裝 Google Chrome 瀏覽器（腳本會自動下載對應的 ChromeDriver）

## 🚀 使用方法

### 基本使用
```bash
python screenshot_script.py
```

### 自定義配置
編輯 `screenshot_script.py` 文件中的 `urls_to_screenshot` 列表：

```python
urls_to_screenshot = [
    {
        "url": "https://jacobhsu.github.io/altfins-widgets/ETH#1H",
        "name": "ETH_1H"  # 自定義文件名
    },
    {
        "url": "https://jacobhsu.github.io/altfins-widgets/BTC#1H", 
        "name": "BTC_1H"
    },
    # 添加更多 URL...
]
```

或使用簡單格式：
```python
urls_to_screenshot = [
    "https://jacobhsu.github.io/altfins-widgets/ETH#1H",
    "https://jacobhsu.github.io/altfins-widgets/BTC#1H",
    # 添加更多 URL...
]
```

## ⚙️ 配置選項

### 修改輸出目錄
```python
screenshot_tool = ScreenshotTaker(
    output_dir="my_screenshots",  # 自定義目錄名
    wait_time=15  # 頁面載入等待時間（秒）
)
```

### 支援的加密貨幣
根據您的 altfins-widgets 項目，支援以下交易對：
- ETH (以太坊)
- BTC (比特幣) 
- SOL (Solana)
- ADA (Cardano)
- DOGE (狗狗幣)
- XRP (瑞波幣)
- BNB (幣安幣)
- SUI (Sui)
- XAUT (黃金代幣)

### 時間框架選項
URL 中的 hash 部分可以指定時間框架：
- `#1H` - 1小時
- `#4H` - 4小時  
- `#1D` - 1天
- `#1W` - 1週

## 📁 輸出結果

截圖將保存在指定目錄中，文件名格式：
- 自定義名稱：`{name}_{timestamp}.png`
- 自動生成：`{coin}_{timeframe}_{timestamp}.png`

例如：
```
crypto_screenshots/
├── ETH_1H_20231215_143022.png
├── BTC_1H_20231215_143045.png
├── SOL_1H_20231215_143108.png
└── ...
```

## 🔧 進階用法

### 創建自定義截圖腳本
```python
from screenshot_script import ScreenshotTaker

# 創建截圖工具
tool = ScreenshotTaker(output_dir="my_screenshots")

# 單個截圖
tool.setup_driver()
tool.take_screenshot("https://jacobhsu.github.io/altfins-widgets/ETH#1H", "eth_chart.png")
tool.close()

# 批量截圖
urls = ["url1", "url2", "url3"]
tool.batch_screenshot(urls)
```

### 定時截圖
結合 cron (Linux/Mac) 或任務計劃程序 (Windows) 可以實現定時截圖：

```bash
# 每小時執行一次截圖
0 * * * * /usr/bin/python3 /path/to/screenshot_script.py
```

## ⚠️ 注意事項

1. **網絡連接**：確保網絡連接穩定，頁面載入需要時間
2. **Chrome 版本**：腳本會自動下載匹配的 ChromeDriver
3. **載入時間**：TradingView 圖表需要額外載入時間，腳本已自動處理
4. **文件權限**：確保有寫入輸出目錄的權限
5. **系統資源**：批量截圖會消耗一定的系統資源

## 🐛 常見問題

### ChromeDriver 問題
```bash
# 如果遇到 ChromeDriver 問題，可以手動指定路徑
export PATH=$PATH:/path/to/chromedriver
```

### 權限問題
```bash
# Linux/Mac 給腳本執行權限
chmod +x screenshot_script.py
```

### 依賴安裝問題
```bash
# 使用國內鏡像源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple selenium webdriver-manager
```

## 📞 技術支援

如果遇到問題，請檢查：
1. Python 版本 (建議 3.7+)
2. Chrome 瀏覽器是否已安裝
3. 網絡連接是否正常
4. 依賴包是否正確安裝

---

**🎯 快速開始**: 運行 `python install_dependencies.py` 然後 `python screenshot_script.py` 即可開始使用！