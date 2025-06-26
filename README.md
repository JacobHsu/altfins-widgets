# Altfins Trading Dashboard

一個支援多種加密貨幣的交易儀表板，整合了 TradingView 圖表和 Altfins 技術分析數據，支援簡單的代碼設定切換交易對。

## 🚀 核心功能

### ⚙️ 簡單設定切換
- **代碼設定**：在 JavaScript 中直接修改要顯示的交易對
- **當前設定**：SOL/USDT (可輕鬆修改)
- **支援 8 種主流幣種**：ETH, SOL, BTC, ADA, DOT, MATIC, LINK, UNI

### 📊 雙面板設計
- **主圖表面板**：顯示選定交易對的完整技術分析
- **進階指標面板**：專門顯示 Bollinger Bands、PSAR 和 RSI
- 全屏響應式設計，最大化圖表可視區域
- 深色主題，適合長時間交易監控

### 📈 TradingView 整合
**主面板技術指標：**
- 簡單移動平均線 (SMA 20, SMA 50)
- 指數移動平均線 (EMA 20, EMA 50)
- MACD 指標

**進階面板技術指標：**
- Bollinger Bands (布林帶)
- Parabolic SAR (拋物線指標)
- RSI (相對強弱指標)

### 🔍 Altfins 技術分析
每個交易對都包含詳細的技術分析數據：

**第一組指標：**
- 幣種資訊和日變化
- SMA20/SMA50 買賣信號
- SMA20 趨勢分析
- SMA20 與 SMA50 交叉信號
- 短期趨勢和趨勢變化

**第二組指標：**
- MACD 買賣信號
- 成交量變化
- CCI20、Williams、STOCH 慢線指標
- 蜻蜓十字星形態識別
- 中期趨勢和趨勢變化

## 技術特點

### ⚡ 性能優化
- 輕量級設計，快速載入
- 實時數據更新
- 最小化的 DOM 操作

## 🌐 使用方式

### 基本訪問
```
# 當前設定顯示 SOL/USDT
https://yourusername.github.io/altfins-widgets/

# 或本地
index.html
```

### 🔧 修改交易對設定

在 `index.html` 中找到以下代碼並修改：

```javascript
// 交易對設定 - 在這裡修改要顯示的交易對
function getSelectedSymbol() {
    // 🔧 在這裡修改交易對設定
    const symbol = 'SOL';  // 改成你想要的交易對

    // 可選交易對: ETH, SOL, BTC, ADA, DOT, MATIC, LINK, UNI
}
```

### 支援的交易對
| 設定值 | 交易對 | 說明 |
|--------|--------|------|
| `'ETH'` | ETH/USDT | 以太坊 |
| `'SOL'` | SOL/USDT | Solana (當前設定) |
| `'BTC'` | BTC/USDT | 比特幣 |
| `'ADA'` | ADA/USDT | Cardano |


## 🛠️ 本地開發

```bash
# 使用 Python 啟動本地服務器
python -m http.server 8000

# 或使用 Node.js
npx serve .

# 然後訪問
http://localhost:8000/
```

## 📁 項目結構

```
altfins-widgets/
├── index.html          # 主應用文件 (動態交易儀表板)
├── dashboard.html      # 功能說明頁面
├── about.html          # 關於頁面
├── home.html           # 首頁介紹
└── README.md          # 項目說明
```

## ⚙️ 技術實現

### 交易對設定
```javascript
// 交易對設定 - 在這裡修改要顯示的交易對
function getSelectedSymbol() {
    const symbol = 'SOL';  // 🔧 修改這裡來切換交易對

    // 支援的交易對映射
    const supportedSymbols = {
        'ETH': 'BINANCE:ETHUSDT',
        'SOL': 'BINANCE:SOLUSDT',
        'BTC': 'BINANCE:BTCUSDT',
        // ... 更多交易對
    };

    return {
        name: symbol.toUpperCase(),
        pair: supportedSymbols[symbol.toUpperCase()]
    };
}
```

### 動態內容更新
- 📊 **圖表標題**：自動更新為選定的交易對
- 🏷️ **頁面標題**：動態顯示當前交易對
- 📈 **TradingView 圖表**：載入對應交易對數據
- 📋 **Altfins 組件**：切換到對應加密貨幣數據

## 🎯 自定義配置

### 切換交易對
1. 打開 `index.html`
2. 找到 `getSelectedSymbol()` 函數
3. 修改 `const symbol = 'SOL';` 為你想要的交易對
4. 保存文件並刷新頁面


## 🌟 特色亮點

- ✅ **簡單設定**：直接修改代碼中的交易對設定
- ✅ **GitHub Pages 友好**：完全靜態，無需後端服務器
- ✅ **響應式設計**：支援桌面和移動設備
- ✅ **實時數據**：整合專業的 TradingView 和 Altfins 數據源
- ✅ **多指標分析**：提供全面的技術分析工具
- ✅ **穩定可靠**：無 URL 參數問題，直接代碼設定

## 📱 使用場景

1. **個人交易監控**：修改代碼設定監控特定交易對
2. **多版本部署**：為不同交易對創建不同版本
3. **專注分析**：固定顯示最關注的交易對
4. **嵌入網站**：作為 iframe 嵌入其他網站

## 🔗 相關資源

- [Altfins - Custom Widget Generator](https://altfins.com/widgets/crypto-widgets-custom/)
- [TradingView Widget Documentation](https://www.tradingview.com/widget/)
- [Altfins Screener Component](https://cdn.altfins.com/js/altfins-screener-data-component.js)
- [GitHub Pages 部署指南](https://docs.github.com/en/pages)

## 📄 授權

本項目使用 MIT 授權條款。

---

**🚀 立即體驗**: 修改代碼中的 `const symbol = 'SOL';` 為你想要的交易對，然後打開 `index.html` 開始使用！
