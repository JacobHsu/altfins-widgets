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
            <!-- ETH/USDT Chart Panel -->
            <div class="chart-panel">
                <div class="chart-panel-title">ETH/USDT</div>
                <div class="widget-wrapper" id="tv_chart_eth"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='["COIN", "PRICE_CHANGE_1D", "MACD_BS_SIGNAL", "SMA20_SMA50_BS_SIGNAL", "SMA20_TREND",  "X_SMA20_CROSS_SMA50"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "X_LAST_PRICE_CROSS_SMA20", "X_LAST_PRICE_CROSS_SMA50", "SHORT_TERM_TREND", "SHORT_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <div class="chart-panel">
                <div class="chart-panel-title">ETH/USDT</div>
                <div class="widget-wrapper" id="tv_chart_bb"></div>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[  "IR_BANDED_OSC",  "IR_PRICE_ABOVE_BOLLINGER_UPPER", "IR_PRICE_BELOW_BOLLINGER_LOWER", "X_LAST_PRICE_CROSS_BOLLINGER_BAND_UPPER"]' affiliateid='test_id'></altfins-screener-data-component>
                <altfins-screener-data-component symbols='["ETH"]' theme='no-border compact dark' valueids='[ "IR_RSI14",  "IR_STOCH", "IR_STOCH_SLOW", "MEDIUM_TERM_TREND", "MEDIUM_TERM_TREND_CHANGE"]' affiliateid='test_id'></altfins-screener-data-component>
            </div>

            <div class="chart-panel">
                <div class="chart-panel-title">ETH/USDT</div>
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

    // Clear existing widgets
    document.getElementById("tv_chart_eth").innerHTML = '';
    document.getElementById("tv_chart_bb").innerHTML = '';
    document.getElementById("tv_chart_kc").innerHTML = '';

    // Create new widgets with the specified interval
    tvWidget1 = createTradingViewWidget("tv_chart_eth", currentSymbol.pair, interval);
    tvWidget2 = createTradingViewWidgetWithBB("tv_chart_bb", currentSymbol.pair, interval);
    tvWidget3 = createTradingViewWidgetWithKC("tv_chart_kc", currentSymbol.pair, interval);
}

function changeInterval(interval, btnElement) {
    renderWidgets(interval);
    document.querySelectorAll('.interval-buttons button').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
}

// 交易對設定 - 在這裡修改要顯示的交易對
function getSelectedSymbol() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const symbol = page.replace('.html', '').toUpperCase();

    // 支援的交易對列表
    const supportedSymbols = {
        'ETH': 'BINANCE:ETHUSDT',
        'SOL': 'BINANCE:SOLUSDT',
        'BTC': 'BINANCE:BTCUSDT',
        'ADA': 'BINANCE:ADAUSDT',
        'DOGE': 'BINANCE:DOGEUSDT',
        'SUI': 'BINANCE:SUIUSDT',
        'XAUT': 'BYBIT:XAUTUSDT'
    };

    // 返回選定的交易對
    if (supportedSymbols[symbol]) {
        return {
            name: symbol,
            pair: supportedSymbols[symbol]
        };
    }

    // 如果設定的交易對不存在，預設返回 ETH
    return {
        name: 'ETH',
        pair: 'BINANCE:ETHUSDT'
    };
}

// 更新頁面標題和面板標題
function updatePageContent(symbolInfo) {
    // 更新頁面標題
    document.title = `${symbolInfo.name}/USDT Dashboard - Altfins Widgets`;

    // 更新圖表面板標題
    const chartTitles = document.querySelectorAll('.chart-panel-title');
    if (chartTitles.length >= 3) {
        chartTitles[0].textContent = `${symbolInfo.name}/USDT`;
        chartTitles[1].textContent = `${symbolInfo.name}/USDT`;
        chartTitles[2].textContent = `${symbolInfo.name}/USDT`;
    }

    // 更新 altfins 組件的 symbols 屬性
    const altfinsComponents = document.querySelectorAll('altfins-screener-data-component');
    altfinsComponents.forEach(component => {
        component.setAttribute('symbols', `["${symbolInfo.name}"]`);
    });
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    createCommonHTML();
    const currentSymbol = getSelectedSymbol();
    updatePageContent(currentSymbol);
    renderWidgets('D'); // Initial render with 1d interval

    // Add event listeners for interval buttons
    document.getElementById('btn-1h').addEventListener('click', (e) => changeInterval('60', e.target));
    document.getElementById('btn-4h').addEventListener('click', (e) => changeInterval('240', e.target));
    document.getElementById('btn-1d').addEventListener('click', (e) => changeInterval('D', e.target));
});
