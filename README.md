# TradingView Fullscreen Dashboard

一個專業的加密貨幣交易儀表板，整合了 TradingView 圖表和 Altfins 技術分析數據。

## 功能特色

### 📊 雙圖表顯示
- **ETH/USDT** 和 **SOL/USDT** 並排顯示
- 全屏響應式設計，最大化圖表可視區域
- 深色主題，適合長時間交易監控

### 📈 TradingView 整合
- 實時價格數據和 K 線圖
- 多種技術指標：
  - 簡單移動平均線 (SMA 20, SMA 50)
  - 指數移動平均線 (EMA 20, EMA 50)
  - MACD 指標
- 完整的右側資訊面板，包含：
  - Key Stats (關鍵統計)
  - Performance (表現)
  - Seasonals (季節性)
  - Technicals (技術分析)

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

## 快速開始

1. **直接使用**：
   ```bash
   # 在瀏覽器中打開 index.html
   open index.html
   ```

2. **本地服務器**（推薦）：
   ```bash
   # 使用 Python
   python -m http.server 8000

   # 或使用 Node.js
   npx serve .

   # 然後訪問 http://localhost:8000
   ```

## 文件結構

```
altfins-widgets/
├── index.html          # 主應用文件
└── README.md          # 項目說明
```

## 自定義配置

### 修改交易對
在 `index.html` 中找到以下行並修改：
```javascript
createTradingViewWidget("tv_chart_eth", "BINANCE:ETHUSDT");
createTradingViewWidget("tv_chart_sol", "BINANCE:SOLUSDT");
```

## 參考

- [altfins - Custom Widget genenator](https://altfins.com/widgets/crypto-widgets-custom/)  
- [TradingView Widget](https://www.tradingview.com/widget/)  
- [Altfins Screener Component](https://cdn.altfins.com/js/altfins-screener-data-component.js)  

