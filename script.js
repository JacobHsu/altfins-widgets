let tvWidget1, tvWidget2, tvWidget3, tvWidget4, tvWidget5;

const supportedSymbols = {
    'BTC': 'BINANCE:BTCUSDT',
    'ETH': 'BINANCE:ETHUSDT',
    'SOL': 'BINANCE:SOLUSDT',
    'XRP': 'BINANCE:XRPUSDT',
    'BNB': 'BINANCE:BNBUSDT',
    'ADA': 'BINANCE:ADAUSDT',
    'DOGE': 'BINANCE:DOGEUSDT',
    'SUI': 'BINANCE:SUIUSDT',
    'XAUT': 'BYBIT:XAUTUSDT'
};

// CoinMarketCap 圖標 ID 映射
const coinMarketCapIds = {
    'BTC': '1',      // Bitcoin
    'ETH': '1027',   // Ethereum
    'SOL': '5426',   // Solana
    'XRP': '52',     // XRP
    'BNB': '1839',   // BNB
    'ADA': '2010',   // Cardano
    'DOGE': '74',    // Dogecoin
    'SUI': '20947',  // Sui
    'XAUT': '5176'   // Tether Gold
};

function createCommonHTML() {
    const body = document.querySelector('body');
    body.innerHTML = `
    <div class="interval-buttons">
        <button id="btn-1h">1h</button>
        <button id="btn-4h">4h</button>
        <button id="btn-1d" class="active">1d</button>
        <div class="custom-dropdown" id="symbol-dropdown">
            <div class="dropdown-selected" id="dropdown-selected">
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png" class="coin-logo" alt="ETH">
                <span>ETH</span>
                <span class="dropdown-arrow">▼</span>
            </div>
            <div class="dropdown-options" id="dropdown-options"></div>
        </div>
    </div>
    <div class="dashboard-container">
        <div class="dashboard-grid">
            <!-- Chart Panel 1 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_eth"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "MACD_BS_SIGNAL", "SMA20_SMA50_BS_SIGNAL", "SMA20_TREND"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "LONG_TERM_TREND", "LONG_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <!-- Chart Panel 2 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_bb"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_BANDED_OSC", "IR_OSCILLATOR_RATING", "IR_RSI14"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "MEDIUM_TERM_TREND", "MEDIUM_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <!-- Chart Panel 3 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_kc"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_STOCH", "IR_STOCH_SLOW"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "SHORT_TERM_TREND", "SHORT_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <!-- Chart Panel 4 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_dc"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_CCI20", "IR_WILLIAMS", "OBV_TREND" ]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "BULL_POWER", "BEAR_POWER", "VOLUME_RELATIVE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <!-- Chart Panel 5 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_st"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "PRICE_CHANGE_1D", "PRICE_CHANGE_1W", "PERFORMANCE"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_NEW_HIGH", "IR_NEW_LOW", "ATH"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>
        </div>
    </div>
    `;
}

function getWidgetConfig(symbol, interval, details = true) {
    return {
        "autosize": true,
        "symbol": symbol,
        "interval": interval,
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "hide_side_toolbar": true,
        "save_image": false,
        "details": details,
        "withdateranges": false,
        "hide_volume": false,
        "allow_symbol_change": false,
        "show_popup_button": false,
        "popup_width": "1000",
        "popup_height": "650",
        "width": "100%",
        "height": "100%"
    };
}

function createTradingViewWidget(containerId, symbol, interval) {
    let config = getWidgetConfig(symbol, interval, false);
    config.studies = [
        {"id": "MASimple@tv-basicstudies", "inputs": {"length": 20}},
        {"id": "MASimple@tv-basicstudies", "inputs": {"length": 50}},
        {"id": "MAExp@tv-basicstudies", "inputs": {"length": 20}},
        {"id": "MAExp@tv-basicstudies", "inputs": {"length": 50}},
        {"id": "MACD@tv-basicstudies", "inputs": {"fastLength": 12, "slowLength": 26, "signalLength": 9}}
    ];
    config.container_id = containerId;
    return new TradingView.widget(config);
}

function createTradingViewWidgetWithBB(containerId, symbol, interval) {
    let config = getWidgetConfig(symbol, interval, false);
    config.studies = ["STD;Bollinger_Bands", "STD;PSAR", "STD;RSI"];
    config.container_id = containerId;
    return new TradingView.widget(config);
}

function createTradingViewWidgetWithKC(containerId, symbol, interval) {
    let config = getWidgetConfig(symbol, interval, false);
    config.studies = [
        "STD;Keltner_Channels",
        "STD;Stochastic",
        "STD;Pivot%1Points%1High%1Low"
    ];
    config.container_id = containerId;
    return new TradingView.widget(config);
}

function createTradingViewWidgetWithDC(containerId, symbol, interval) {
    let config = getWidgetConfig(symbol, interval, false);
    config.studies = [
        "STD;Williams_Alligator",
        "STD;Donchian_Channels",
        "STD;CCI",
    ];
    config.container_id = containerId;
    return new TradingView.widget(config);
}

function createTradingViewWidgetWithST(containerId, symbol, interval) {
    let config = getWidgetConfig(symbol, interval, true);
    config.studies = [
        "STD;Supertrend",
        "STD;Average_True_Range",
        "STD;MA%1Cross"
    ];
    config.container_id = containerId;
    return new TradingView.widget(config);
}

function renderWidgets(interval) {
    const currentSymbol = getSelectedSymbol();

    document.getElementById("tv_chart_eth").innerHTML = '';
    document.getElementById("tv_chart_bb").innerHTML = '';
    document.getElementById("tv_chart_kc").innerHTML = '';
    document.getElementById("tv_chart_dc").innerHTML = '';
    document.getElementById("tv_chart_st").innerHTML = '';

    tvWidget1 = createTradingViewWidget("tv_chart_eth", currentSymbol.pair, interval);
    tvWidget2 = createTradingViewWidgetWithBB("tv_chart_bb", currentSymbol.pair, interval);
    tvWidget3 = createTradingViewWidgetWithKC("tv_chart_kc", currentSymbol.pair, interval);
    tvWidget4 = createTradingViewWidgetWithDC("tv_chart_dc", currentSymbol.pair, interval);
    tvWidget5 = createTradingViewWidgetWithST("tv_chart_st", currentSymbol.pair, interval);
}

function changeInterval(interval, btnElement) {
    renderWidgets(interval);
    document.querySelectorAll('.interval-buttons button').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    
    // 更新 hash 來反映當前的時間間隔
    const intervalMap = {
        '60': '1H',
        '240': '4H',
        'D': '1D'
    };
    const hashInterval = intervalMap[interval];
    if (hashInterval) {
        window.location.hash = hashInterval;
    }
}

function getSelectedSymbol() {
    // 檢查 URL 路徑 (如 /BTC 或 /BTC/1H)
    const path = window.location.pathname;
    const pathParts = path.split("/").filter(part => part !== '');
    
    // 處理 GitHub Pages 路徑 (如 /altfins-widgets/BTC)
    const symbolIndex = pathParts[0] === 'altfins-widgets' ? 1 : 0;
    
    if (pathParts.length > symbolIndex) {
        const symbol = pathParts[symbolIndex].toUpperCase();
        if (supportedSymbols[symbol]) {
            return { name: symbol, pair: supportedSymbols[symbol] };
        }
    }
    
    // 處理 BTC.html 格式的路徑
    const page = pathParts[pathParts.length - 1] || '';
    const symbol = page.replace('.html', '').toUpperCase();

    if (supportedSymbols[symbol]) {
        return { name: symbol, pair: supportedSymbols[symbol] };
    }
    return { name: 'ETH', pair: 'BINANCE:ETHUSDT' };
}

function getIntervalFromUrl() {
    const hash = window.location.hash.substring(1); // 移除 #
    if (hash) {
        const intervalPart = hash.toUpperCase();
        if (['1H', '4H', '1D'].includes(intervalPart)) {
            switch (intervalPart) {
                case '1H':
                    return { interval: '60', buttonId: 'btn-1h' };
                case '4H':
                    return { interval: '240', buttonId: 'btn-4h' };
                case '1D':
                    return { interval: 'D', buttonId: 'btn-1d' };
            }
        }
    }
    
    // 默認返回 1D
    return { interval: 'D', buttonId: 'btn-1d' };
}

function updatePageContent(symbolInfo) {
    document.title = `${symbolInfo.name}/USDT Dashboard - Altfins Widgets`;
    const chartTitles = document.querySelectorAll('.chart-panel-title');
    if (chartTitles.length >= 4) {
        // 第一張圖表：MA, MACD
        chartTitles[0].innerHTML = `${symbolInfo.name}/USDT <span class="indicators-info">
            <a href="https://tw.tradingview.com/support/solutions/43000502589/" target="_blank" class="indicator-link">MA</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000502344/" target="_blank" class="indicator-link">MACD</a>
        </span>`;
        
        // 第二張圖表：BB, SAR, RSI // MA 轉向指標 震盪指標穩健型
        chartTitles[1].innerHTML = `${symbolInfo.name}/USDT <span class="indicators-info">
            <a href="https://tw.tradingview.com/support/solutions/43000501840/" target="_blank" class="indicator-link">BB</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000502597/" target="_blank" class="indicator-link">SAR</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000502338/" target="_blank" class="indicator-link">RSI</a>
        </span>`;
        
        // 第三張圖表：KC, Pivots, KD // EMA + ATR 
        chartTitles[2].innerHTML = `${symbolInfo.name}/USDT <span class="indicators-info">
            <a href="https://tw.tradingview.com/support/solutions/43000502266/" target="_blank" class="indicator-link">KC</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000589195/" target="_blank" class="indicator-link">Pivots</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000502332/" target="_blank" class="indicator-link">KD</a>
        </span>`;
        
        // 第四張圖表：DC, Alligator, CCI 
        chartTitles[3].innerHTML = `${symbolInfo.name}/USDT <span class="indicators-info">
            <a href="https://tw.tradingview.com/support/solutions/43000502253/" target="_blank" class="indicator-link">DC</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000592305/" target="_blank" class="indicator-link"><span style="color: #34B77B">Alli</span><span style="color: #FF5252">gat</span><span style="color: #2962FF">or</span></a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000502001/" target="_blank" class="indicator-link">CCI</a>
        </span>`;

        // 第五張圖表：Supertrend, ATR, MA
        chartTitles[4].innerHTML = `${symbolInfo.name}/USDT <span class="indicators-info">
            <a href="https://tw.tradingview.com/support/solutions/43000634738/" target="_blank" class="indicator-link">Supertrend</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000501823/" target="_blank" class="indicator-link">ATR</a>, 
            <a href="https://tw.tradingview.com/support/solutions/43000502589/" target="_blank" class="indicator-link">MA</a>
        </span>`;
    }
    const altfinsComponents = document.querySelectorAll('altfins-screener-data-component');
    altfinsComponents.forEach(component => {
        component.setAttribute('symbols', `["${symbolInfo.name}"]`);
    });
}

// --- 技術指標教學內容 ---

const indicatorDefinitions = [
    {
        name: "移動平均線 (MA - Moving Average)",
        description: "MA 是用來平滑價格數據，以識別趨勢方向的指標。它計算特定期間內的平均價格。",
        usage: [
            "短期均線穿越長期均線（黃金交叉），可能預示著上漲趨勢的開始。",
            "短期均線跌破長期均線（死亡交叉），可能預示著下跌趨勢的開始。",
            "價格在均線之上，均線可視為支撐；價格在均線之下，均線則可視為壓力。"
        ]
    },
    {
        name: "平滑異同移動平均線 (MACD)",
        description: "MACD 是一個動量指標，顯示兩條移動平均線之間的關係，幫助判斷趨勢的強度、方向、動量以及轉折點。",
        usage: [
            "快線 (DIF) 由上而下穿越慢線 (MACD/DEM)，稱為「死亡交叉」，是賣出訊號。",
            "快線 (DIF) 由下而上穿越慢線 (MACD/DEM)，稱為「黃金交叉」，是買入訊號。",
            "柱狀體 (Histogram) 代表快慢線的差距，正值越大表示上漲動能越強，負值越大表示下跌動能越強。"
        ]
    },
    {
        name: "相對強弱指數 (RSI - Relative Strength Index)",
        description: "RSI 是一個動量振盪指標，衡量價格變動的速度和變動幅度，主要用來判斷市場是否處於超買或超賣狀態。",
        usage: [
            "RSI > 70 通常被視為超買區，價格可能回檔。",
            "RSI < 30 通常被視為超賣區，價格可能反彈。",
            "RSI 的背離（價格創新高/低，但 RSI 未跟隨）是趨勢可能反轉的重要警訊。"
        ]
    },
    {
        name: "隨機指標 (KD - Stochastic Oscillator)",
        description: "KD 指標是一個動量振盪指標，由 %K 線和 %D 線組成。它比較收盤價與一定期間內最高價和最低價的相對位置，用來判斷超買超賣狀態和趨勢轉折點。",
        usage: [
            "KD 值在 80 以上為超買區，價格可能面臨回檔壓力；KD 值在 20 以下為超賣區，價格可能出現反彈。",
            "%K 線向上穿越 %D 線（黃金交叉）是買入信號；%K 線向下穿越 %D 線（死亡交叉）是賣出信號。",
            "KD 指標與價格的背離（價格創新高但 KD 未跟隨，或價格創新低但 KD 未跟隨）是趨勢可能反轉的重要警訊。",
            "在強勢上升趨勢中，KD 可能長時間停留在高檔區（50-80），此時不宜過早賣出；在強勢下跌趨勢中亦然。"
        ]
    },
    {
        name: "布林通道 (BB - Bollinger Bands)",
        description: "BB 由三條線組成：中軌（一條簡單移動平均線）以及上下各一條標準差軌道。它用來衡量市場的波動性。",
        usage: [
            "價格觸及上軌，可能表示超買；觸及下軌，可能表示超賣。",
            "通道變窄（擠壓），預示著市場波動性即將放大，可能出現突破行情。",
            "價格持續沿著上軌或下軌運行，表示趨勢非常強勁。"
        ]
    },
    {
        name: "肯特納通道 (KC - Keltner Channels)",
        description: "KC 類似布林通道，但其上下軌是基於平均真實波幅 (ATR) 計算的，通常用來識別趨勢和尋找突破機會。",
        usage: [
            "價格收盤在 KC 上軌之上，是強烈的看漲訊號。",
            "價格收盤在 KC 下軌之下，是強烈的看跌訊號。",
            "KC 可與 BB 結合使用，以過濾掉一些假突破訊號。"
        ]
    },
    {
        name: "唐奇安通道 (Donchian Channels)",
        description: "此指標由三條線組成，分別是指定週期內的最高價、最低價以及兩者的平均值。它主要用於識別突破。",
        usage: [
            "價格突破上軌是強烈的買入信號，表明趨勢可能向上。",
            "價格跌破下軌是強烈的賣出信號，表明趨勢可能向下。",
            "中線可用於判斷趨勢的強度和潛在的回調水平。"
        ]
    },
    {
        name: "順勢指標 (CCI - Commodity Channel Index)",
        description: "CCI 是一個振盪指標，用來衡量價格相對於其統計平均值的變化，幫助識別趨勢的開始和結束。",
        usage: [
            "CCI > +100 可能表示進入超買狀態，趨勢可能反轉。",
            "CCI < -100 可能表示進入超賣狀態，趨勢可能反轉。",
            "CCI 從負值區向上突破 0 軸，可視為買入機會；反之則為賣出機會。"
        ]
    },
    {
        name: "威廉指標 (Williams Alligator)",
        description: "該指標使用三條平滑移動平均線，模擬鱷魚的嘴、牙齒和下巴。它有助於識別趨勢的形成和方向。",
        usage: [
            "當三條線糾纏在一起時，表示市場處於休眠狀態（鱷魚在睡覺）。",
            "當線條開始分開並向上（綠色 > 紅色 > 藍色）時，是上升趨勢的信號。",
            "當線條開始分開並向下（藍色 > 紅色 > 綠色）時，是下降趨勢的信號。"
        ]
    },
    {
        name: "資金流指標 (Money Flow Index - MFI)",
        description: "MFI 是一個成交量加權的動量指標，用於衡量資金流入和流出的強度。它類似於 RSI，但考慮了成交量。",
        usage: [
            "MFI > 80 通常被視為超買，可能出現回調。",
            "MFI < 20 通常被視為超賣，可能出現反彈。",
            "MFI 與價格的背離（例如，價格創新高但 MFI 下降）是趨勢可能反轉的強烈信號。"
        ]
    },
    {
        name: "威廉 %R 指標 (Williams %R)",
        description: "Williams %R 是一個動量指標，與隨機振盪指標 (Stochastic Oscillator) 非常相似。它用於確定超買和超賣水平。",
        usage: [
            "%R 讀數在 -20 以上表示超買狀態。",
            "%R 讀數在 -80 以下表示超賣狀態。",
            "與RSI一樣，尋找價格與%R之間的背離可以提供強烈的反轉信號。"
        ]
    },
    {
        name: "平均真實波幅 (ATR - Average True Range)",
        description: "ATR 主要用來衡量市場的波動性，它顯示的是特定時期內價格的平均波動範圍。ATR 本身不提供趨勢方向。",
        usage: [
            "ATR 上升，表示市場波動加劇，可能預示著趨勢的開始或現有趨勢的加速。",
            "ATR 下降，表示市場波動減弱，進入盤整或趨勢放緩。",
            "交易者常使用 ATR 來設定止損位，例如將止損設在進場價位的 1.5 或 2 倍 ATR 之外。"
        ]
    },
    {
        name: "超級趨勢 (Supertrend)",
        description: "Supertrend 是一個基於 ATR 的趨勢跟隨指標，它在圖表上顯示為動態的支撐和阻力線。當價格在 Supertrend 線上方時顯示為綠色（看漲），在下方時顯示為紅色（看跌）。",
        usage: [
            "當價格突破 Supertrend 線並轉為綠色時，是強烈的買入信號。",
            "當價格跌破 Supertrend 線並轉為紅色時，是強烈的賣出信號。",
            "Supertrend 線可以作為動態的止損位，綠色趨勢中以 Supertrend 線作為止損支撐。",
            "在強勢趨勢中，價格往往會沿著 Supertrend 線運行，很少跌破或突破。"
        ]
    }
];

const combinedScenarios = [
    {
        title: "組合判斷：BB + KC 識別假突破",
        explanation: [
            "當價格 %c突破布林通道 (BB) 上軌%c，但 %c仍在肯特納通道 (KC) 上軌之內%c 時，這可能是一個 %c「假突破」%c。",
            "這種情況暗示上漲動能可能後繼無力，市場可能即將回檔或盤整。",
            "操作建議：可等待價格回到 BB 通道內再考慮操作，或結合 RSI 是否超買來進一步確認。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：BB + KC 尋找「擠壓」突破機會",
        explanation: [
            "當 %c布林通道 (BB) 的寬度收窄到比肯特納通道 (KC) 還要窄%c 時，市場進入了低波動的 %c「擠壓 (Squeeze)」%c 狀態。",
            "「擠壓」狀態通常預示著一場大的單邊行情即將到來。",
            "操作建議：當價格帶量突破 BB 及 KC 上軌時，是強力的買入訊號；反之，跌破下軌則是強力的賣出訊號。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：MACD + RSI 確認趨勢反轉",
        explanation: [
            "當價格持續下跌並創新低，但 %cRSI 指標卻未跟隨創下新低%c（底背離），這是一個潛在的反轉訊號。",
            "如果此時 %cMACD 也出現黃金交叉%c（快線向上穿越慢線），則趨勢反轉的可能性將大幅提高。",
            "操作建議：這是左側交易者嘗試進場做多的時機，但仍需注意風險控制。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：CCI, %R, RSI 識別多重過熱信號",
        explanation: [
            "當 %cCCI > 100 且 Williams %R > -20%c 時，市場短期內可能處於 %c極度超買（過熱）%c 狀態，回調風險較高。",
            "但如果此時 %cRSI 並未顯示超買（例如 RSI < 70）%c，這可能意味著上漲趨勢的 %c中期動能依然穩固%c。",
            "操作建議：這種情況下，短期交易者可能會考慮獲利了結或減倉，但中期趨勢交易者可能會選擇持有，等待短期指標回落後再加倉。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal', 'font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：KC 突破 vs BB 未突破 (擠壓的前兆)",
        explanation: [
            "當價格 %c突破肯特納通道 (KC) 上軌%c，但 %c未能突破布林通道 (BB) 上軌%c 時，這是一個值得關注的信號。",
            "這種情況通常發生在 %c「擠壓」%c 期間，表明波動性正在增加，但尚未達到足以觸發 BB 突破的程度。",
            "操作建議：這可以視為趨勢可能啟動的 %c早期警報%c。交易者應密切關注，一旦價格隨後也突破 BB 上軌，便可確認趨勢，並考慮進場。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：ATR + MACD 預測趨勢與波動",
        explanation: [
            "當 %cATR 指標持續上升%c，表示市場 %c波動性正在加劇%c。這通常發生在趨勢即將開始或反轉時。",
            "如果此時 %cMACD 發生黃金交叉%c（快線向上穿過慢線），這是一個強烈的 %c看漲信號%c，暗示在波動加劇的背景下，上漲趨勢可能形成。",
            "反之，如果 %cMACD 發生死亡交叉%c，則預示著在劇烈波動下，下跌趨勢可能來臨。",
            "操作建議：交易者可以利用 ATR 來設定止損位。例如，在買入後，將止損設置在 `進場價 - 2 * ATR` 的位置，以應對市場波動。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal', 'font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #FF6B6B', 'font-weight: normal']
    },
    {
        title: "組合判斷：ATR + 移動平均線 (MA) 過濾盤整行情",
        explanation: [
            "在橫盤整理的市場中，價格會頻繁地穿越移動平均線，產生許多假的交易信號。",
            "此時可以觀察 %cATR 指標%c。如果 ATR 處於 %c低水平且持續下降%c，這確認了市場正處於低波動的盤整狀態。",
            "操作建議：在低 ATR 環境下，應避免追逐由 MA 交叉產生的突破信號，因為這些很可能是陷阱。等待 ATR 開始顯著上升，再結合 MA 的方向進行交易會更可靠。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：ATR + RSI 判斷趨勢動能",
        explanation: [
            "當 %cRSI 進入超買區 (>70) 或超賣區 (<30)%c 時，通常表示趨勢可能暫停或反轉。",
            "但如果此時 %cATR 指標同時也在飆升%c，這意味著市場的 %c波動性和動能極強%c。",
            "操作建議：這種情況下，趨勢很可能會延續，而不是立即反轉。例如，RSI 超買 + ATR 飆升，可能不是做空的好時機，而是趨勢極強的表現。交易者應等待 ATR 開始回落，再考慮根據 RSI 的信號進行逆勢操作。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：Supertrend + MACD 確認趨勢強度",
        explanation: [
            "當 %cSupertrend 轉為綠色%c（價格突破 Supertrend 線）時，這是一個強烈的趨勢信號。",
            "如果同時 %cMACD 也出現黃金交叉%c（快線向上穿越慢線），這雙重確認了上升趨勢的開始。",
            "操作建議：這是非常可靠的買入時機。Supertrend 提供趨勢方向，MACD 提供動量確認。可以在 Supertrend 線附近設置止損，享受趨勢帶來的利潤。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：Supertrend + RSI 避免假突破",
        explanation: [
            "當 %cSupertrend 剛轉為綠色%c 時，如果 %cRSI 已經處於超買區 (>70)%c，這可能是一個假突破的警告。",
            "這種情況表明價格可能已經漲得太快，缺乏持續上漲的動能。",
            "操作建議：等待 RSI 回落到中性區域（30-70）後，再考慮跟隨 Supertrend 的信號進場。或者採用較小的倉位，並設置較緊的止損。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #FF6B6B', 'font-weight: normal']
    },
    {
        title: "組合判斷：Supertrend + 移動平均線 (MA) 多重趨勢確認",
        explanation: [
            "當 %cSupertrend 為綠色且價格位於 20 日和 50 日移動平均線之上%c 時，這是多重趨勢確認。",
            "如果 %c20 日 MA 也位於 50 日 MA 之上%c，形成完美的多頭排列，趨勢極其強勁。",
            "操作建議：這是最安全的趨勢跟隨機會。可以在任何回調至 Supertrend 線或 20 日 MA 附近時加倉。止損可設在 50 日 MA 下方。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：Supertrend + 布林通道 (BB) 判斷突破品質",
        explanation: [
            "當價格 %c突破布林通道上軌且 Supertrend 同時轉綠%c 時，這是高品質突破的強烈信號。",
            "如果 %cSupertrend 轉綠但價格仍在布林通道內%c，可能只是短期反彈，而非真正的趨勢反轉。",
            "操作建議：等待價格同時滿足兩個條件：突破 BB 上軌 + Supertrend 轉綠，這樣的突破更可靠。可以用 Supertrend 線作為移動止損。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #FF6B6B', 'font-weight: normal']
    },
    {
        title: "組合判斷：Supertrend + ATR 優化進場時機",
        explanation: [
            "當 %cSupertrend 轉為綠色%c 時，觀察 %cATR 的水平%c 可以幫助判斷進場時機。",
            "如果 %cATR 處於低水平%c，表示市場波動較小，突破後的趨勢可能更持久但利潤空間有限。",
            "如果 %cATR 處於高水平%c，表示市場波動劇烈，趨勢可能很強但也更容易出現回調。",
            "操作建議：低 ATR 環境下可以用較大倉位、較寬止損；高 ATR 環境下應該用較小倉位、較緊止損，並準備應對更大的價格波動。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：Supertrend + Parabolic SAR 雙重趨勢確認",
        explanation: [
            "當 %cSupertrend 轉為綠色且 SAR 點位於價格下方%c 時，這是雙重趨勢確認的強烈信號。",
            "兩個指標都是趨勢跟隨工具，但計算方式不同：%cSupertrend 基於 ATR，SAR 基於加速因子%c。",
            "如果 %c兩個指標同時給出相同的趨勢信號%c，這大大提高了趨勢判斷的可靠性。",
            "操作建議：當兩個指標都確認上升趨勢時，可以更有信心地持有多頭部位。止損可設在兩個指標中較高的那一個，提供雙重保護。當任一指標轉向時，應考慮減倉或平倉。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：Supertrend vs SAR 訊號分歧時的處理",
        explanation: [
            "當 %cSupertrend 和 SAR 給出不同信號%c 時（例如 Supertrend 綠色但 SAR 在價格上方），這通常表示市場處於轉折期。",
            "這種分歧往往發生在 %c趨勢即將反轉或進入盤整%c 的階段。",
            "觀察哪個指標先改變方向，通常 %cSAR 對短期變化更敏感%c，而 %cSupertrend 對中期趨勢更穩定%c。",
            "操作建議：訊號分歧時應該降低倉位，等待兩個指標重新同步。如果 SAR 先轉向，可能是短期調整；如果 Supertrend 先轉向，可能是較大級別的趨勢變化。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal', 'font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：KD + RSI 雙重超買超賣確認",
        explanation: [
            "當 %cKD 指標進入超買區 (>80) 且 RSI 也同時超買 (>70)%c 時，這是 %c雙重超買確認%c，回調風險極高。",
            "反之，當 %cKD 指標進入超賣區 (<20) 且 RSI 也同時超賣 (<30)%c 時，這是 %c雙重超賣確認%c，反彈機會較大。",
            "操作建議：雙重超買時應考慮獲利了結或做空；雙重超賣時可考慮逢低買入。但需注意強勢趨勢中指標可能長時間停留在極值區域。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal', 'font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：KD + MACD 確認趨勢轉折",
        explanation: [
            "當價格創新低但 %cKD 指標未跟隨創新低%c（底背離），同時 %cMACD 出現黃金交叉%c，這是強烈的看漲轉折信號。",
            "當價格創新高但 %cKD 指標未跟隨創新高%c（頂背離），同時 %cMACD 出現死亡交叉%c，這是強烈的看跌轉折信號。",
            "操作建議：KD 背離提供早期警訊，MACD 交叉提供進場確認。兩者結合可以提高趨勢轉折判斷的準確性，是左側交易的重要參考。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal', 'font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：KD + 移動平均線 (MA) 趨勢內的回調機會",
        explanation: [
            "在明確的上升趨勢中（價格位於 20 日和 50 日 MA 之上），當 %cKD 指標回落至超賣區 (<20)%c 時，這通常是 %c趨勢內的健康回調%c。",
            "此時 %cKD 的黃金交叉%c（%K 向上穿越 %D）往往是重新進場做多的絕佳時機。",
            "操作建議：在趨勢明確的前提下，利用 KD 超賣後的黃金交叉作為加倉點。止損可設在最近的 MA 支撐下方。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：KD + 布林通道 (BB) 識別突破品質",
        explanation: [
            "當價格 %c突破布林通道上軌%c 且 %cKD 指標同時發生黃金交叉%c 時，這是高品質突破的強烈信號。",
            "如果 %cKD 已經處於超買區 (>80) 才突破 BB 上軌%c，則突破的持續性可能較弱，需要謹慎對待。",
            "操作建議：最佳的突破進場時機是 KD 從中性區域（20-80）開始向上且價格同時突破 BB 上軌。這樣的突破通常有較好的後續表現。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    },
    {
        title: "組合判斷：KD + ATR 判斷波動環境下的操作策略",
        explanation: [
            "在 %c高 ATR 環境%c（市場波動劇烈）下，%cKD 指標的信號可能會頻繁出現%c，增加假信號的機率。",
            "在 %c低 ATR 環境%c（市場波動平緩）下，%cKD 的信號相對更可靠%c，但利潤空間可能有限。",
            "操作建議：高波動時期應該提高 KD 信號的確認標準，例如等待 KD 在極值區停留更長時間；低波動時期可以更積極地跟隨 KD 信號，但要設置合理的利潤目標。"
        ],
        styles: ['font-weight: bold; color: #FF6B6B', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal', 'font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal']
    },
    {
        title: "組合判斷：KD + Supertrend 多時間框架分析",
        explanation: [
            "當 %c日線 Supertrend 為綠色%c（確認中期上升趨勢）時，可以在 %c小時線觀察 KD 指標%c 尋找短期進場機會。",
            "在大趨勢向上的前提下，%c小時線 KD 的超賣後黃金交叉%c 是非常好的進場點，風險相對較低。",
            "操作建議：使用 Supertrend 確定大方向，用 KD 優化進場時機。這種多時間框架的組合可以提高勝率並改善風險回報比。"
        ],
        styles: ['font-weight: bold; color: #4ECDC4', 'font-weight: normal', 'font-weight: bold; color: #2962FF', 'font-weight: normal', 'font-weight: bold; color: #F9A825', 'font-weight: normal']
    }
];

// --- 教學引擎 ---
let tutorialStep = 0;
const totalDefinitions = indicatorDefinitions.length;
const totalScenarios = combinedScenarios.length;

function logTutorial() {
    const mainTitleStyle = 'font-size: 16px; font-weight: bold;';
    const descriptionStyle = 'font-style: italic; margin-bottom: 5px;';
    const usageStyle = '';

    if (tutorialStep < totalDefinitions) {
        const indicator = indicatorDefinitions[tutorialStep];
        console.group(`%c📘 指標教學 (${tutorialStep + 1}/${totalDefinitions}): ${indicator.name}`, `${mainTitleStyle} color: #4ECDC4;`);
        console.log(`%c${indicator.description}`, descriptionStyle);
        indicator.usage.forEach(use => {
            console.log(`%c  • ${use}`, usageStyle);
        });
        console.groupEnd();
    } else {
        const scenarioIndex = tutorialStep - totalDefinitions;
        const scenario = combinedScenarios[scenarioIndex];
        console.group(`%c🧠 組合分析教學 (${scenarioIndex + 1}/${totalScenarios}): ${scenario.title}`, `${mainTitleStyle} color: #2962FF;`);
        scenario.explanation.forEach((line, index) => {
            const styles = scenario.styles[index] ? [scenario.styles[index]] : [];
            console.log(line, ...styles);
        });
        console.groupEnd();
    }

    tutorialStep = (tutorialStep + 1) % (totalDefinitions + totalScenarios);
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    createCommonHTML();
    const currentSymbol = getSelectedSymbol();
    const urlInterval = getIntervalFromUrl();
    
    updatePageContent(currentSymbol);
    renderWidgets(urlInterval.interval);

    // 設置正確的按鈕狀態
    document.querySelectorAll('.interval-buttons button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(urlInterval.buttonId).classList.add('active');

    document.getElementById('btn-1h').addEventListener('click', (e) => changeInterval('60', e.target));
    document.getElementById('btn-4h').addEventListener('click', (e) => changeInterval('240', e.target));
    document.getElementById('btn-1d').addEventListener('click', (e) => changeInterval('D', e.target));

    // Setup custom dropdown
    const dropdownSelected = document.getElementById('dropdown-selected');
    const dropdownOptions = document.getElementById('dropdown-options');
    
    // Update selected display
    const selectedImg = dropdownSelected.querySelector('img');
    const selectedSpan = dropdownSelected.querySelector('span');
    const coinId = coinMarketCapIds[currentSymbol.name];
    selectedImg.src = `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`;
    selectedImg.alt = currentSymbol.name;
    selectedSpan.textContent = currentSymbol.name;
    
    // Populate dropdown options
    for (const symbol in supportedSymbols) {
        const option = document.createElement('div');
        option.className = 'dropdown-option';
        option.dataset.value = symbol;
        if (symbol === currentSymbol.name) {
            option.classList.add('selected');
        }
        const coinId = coinMarketCapIds[symbol];
        option.innerHTML = `<img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png" class="coin-logo" alt="${symbol}"> <span>${symbol}</span>`;
        dropdownOptions.appendChild(option);
    }

    // Dropdown toggle functionality
    dropdownSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownSelected.classList.toggle('open');
        dropdownOptions.classList.toggle('show');
    });

    // Option selection
    dropdownOptions.addEventListener('click', (e) => {
        const option = e.target.closest('.dropdown-option');
        if (option) {
            const selectedValue = option.dataset.value;
            
            // Update selected display immediately for better UX
            const selectedImg = dropdownSelected.querySelector('img');
            const selectedSpan = dropdownSelected.querySelector('span');
            const coinId = coinMarketCapIds[selectedValue];
            selectedImg.src = `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`;
            selectedImg.alt = selectedValue;
            selectedSpan.textContent = selectedValue;
            
            // Update selected state
            document.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // Close dropdown
            dropdownSelected.classList.remove('open');
            dropdownOptions.classList.remove('show');
            
            // Navigate to new page
            setTimeout(() => {
                window.location.href = `${selectedValue}.html`;
            }, 150);
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdownSelected.classList.remove('open');
        dropdownOptions.classList.remove('show');
    });

    logTutorial(); 
    setInterval(() => {
        console.clear();
        logTutorial();
    }, 30000);

    // 監聽 hash 變化
    window.addEventListener('hashchange', () => {
        const currentSymbol = getSelectedSymbol();
        const urlInterval = getIntervalFromUrl();
        
        updatePageContent(currentSymbol);
        renderWidgets(urlInterval.interval);
        
        // 設置正確的按鈕狀態
        document.querySelectorAll('.interval-buttons button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(urlInterval.buttonId).classList.add('active');
    });
});