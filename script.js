let tvWidget1, tvWidget2, tvWidget3;

function createCommonHTML() {
    const body = document.querySelector('body');
    body.innerHTML = `
    <div class="interval-buttons">
        <button id="btn-1h">1h</button>
        <button id="btn-4h">4h</button>
        <button id="btn-1d" class="active">1d</button>
    </div>
    <div class="dashboard-container">
        <div class="dashboard-grid">
            <!-- Chart Panel 1 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_eth"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='["COIN", "PRICE_CHANGE_1D", "MACD_BS_SIGNAL", "SMA20_SMA50_BS_SIGNAL", "SMA20_TREND",  "X_SMA20_CROSS_SMA50"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "X_LAST_PRICE_CROSS_SMA20", "X_LAST_PRICE_CROSS_SMA50", "SHORT_TERM_TREND", "SHORT_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <!-- Chart Panel 2 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_bb"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_BANDED_OSC",  "IR_PRICE_ABOVE_BOLLINGER_UPPER", "IR_PRICE_BELOW_BOLLINGER_LOWER"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_RSI14",  "IR_STOCH",  "MEDIUM_TERM_TREND", "MEDIUM_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <!-- Chart Panel 3 -->
            <div class="chart-panel">
                <div class="chart-panel-title"> </div>
                <div class="widget-wrapper" id="tv_chart_kc"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "VOLUME_CHANGE", "IR_UNUSUAL_VOLUME_SPIKE",  "BULL_POWER", "BEAR_POWER"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_CCI20", "IR_OSCILLATOR_RATING",  "LONG_TERM_TREND", "LONG_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
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
    let config = getWidgetConfig(symbol, interval, true);
    config.studies = [
        "STD;Keltner_Channels",
        "STD;CCI",
        "STD;Pivot%1Points%1High%1Low"
    ];
    config.container_id = containerId;
    return new TradingView.widget(config);
}

function renderWidgets(interval) {
    const currentSymbol = getSelectedSymbol();

    document.getElementById("tv_chart_eth").innerHTML = '';
    document.getElementById("tv_chart_bb").innerHTML = '';
    document.getElementById("tv_chart_kc").innerHTML = '';

    tvWidget1 = createTradingViewWidget("tv_chart_eth", currentSymbol.pair, interval);
    tvWidget2 = createTradingViewWidgetWithBB("tv_chart_bb", currentSymbol.pair, interval);
    tvWidget3 = createTradingViewWidgetWithKC("tv_chart_kc", currentSymbol.pair, interval);
}

function changeInterval(interval, btnElement) {
    renderWidgets(interval);
    document.querySelectorAll('.interval-buttons button').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
}

function getSelectedSymbol() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const symbol = page.replace('.html', '').toUpperCase();

    const supportedSymbols = {
        'ETH': 'BINANCE:ETHUSDT',
        'SOL': 'BINANCE:SOLUSDT',
        'BTC': 'BINANCE:BTCUSDT',
        'ADA': 'BINANCE:ADAUSDT',
        'DOGE': 'BINANCE:DOGEUSDT',
        'SUI': 'BINANCE:SUIUSDT',
        'XAUT': 'BYBIT:XAUTUSDT'
    };

    if (supportedSymbols[symbol]) {
        return { name: symbol, pair: supportedSymbols[symbol] };
    }
    return { name: 'ETH', pair: 'BINANCE:ETHUSDT' };
}

function updatePageContent(symbolInfo) {
    document.title = `${symbolInfo.name}/USDT Dashboard - Altfins Widgets`;
    const chartTitles = document.querySelectorAll('.chart-panel-title');
    if (chartTitles.length >= 3) {
        chartTitles[0].textContent = `${symbolInfo.name}/USDT`;
        chartTitles[1].textContent = `${symbolInfo.name}/USDT`;
        chartTitles[2].textContent = `${symbolInfo.name}/USDT`;
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
        name: "布林通道 (BB - Bollinger Bands)",
        description: "BB 由三條線組成：中軌（一條簡單移動平均線）以及上下各一條標準差軌道。它用來衡量市場的波動性。",
        usage: [
            "價格觸及上軌，可能表示超買；觸及下軌，可能表示超賣。",
            "通道變窄（擠壓），預示著市場波動性即將放大，可能出現突破行情。",
            "價格持續沿著上軌或下軌運行，表示趨勢非常強勁。"
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
        name: "肯特納通道 (KC - Keltner Channels)",
        description: "KC 類似布林通道，但其上下軌是基於平均真實波幅 (ATR) 計算的，通常用來識別趨勢和尋找突破機會。",
        usage: [
            "價格收盤在 KC 上軌之上，是強烈的看漲訊號。",
            "價格收盤在 KC 下軌之下，是強烈的看跌訊號。",
            "KC 可與 BB 結合使用，以過濾掉一些假突破訊號。"
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
    updatePageContent(currentSymbol);
    renderWidgets('D');

    document.getElementById('btn-1h').addEventListener('click', (e) => changeInterval('60', e.target));
    document.getElementById('btn-4h').addEventListener('click', (e) => changeInterval('240', e.target));
    document.getElementById('btn-1d').addEventListener('click', (e) => changeInterval('D', e.target));

    logTutorial(); 
    setInterval(() => {
        console.clear();
        logTutorial();
    }, 30000);
});
