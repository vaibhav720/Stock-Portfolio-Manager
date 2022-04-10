import TradingViewWidget, { Themes } from "react-tradingview-widget";
/* import TechnicalAnalysis, {
  THEMES,
  INTERVALS
} from "react-tradingview-technical-analysis"; */
import {
  MarketOverview,
  TechnicalAnalysis
} from "react-ts-tradingview-widgets";

export default function TradingWidget() {
  return (
    <div className="App">
      <div style={{ height: 500 }}>
        <TradingViewWidget
          symbol="NASDAQ:AAPL"
          theme={Themes.DARK}
          locale="es"
          autosize
        />
      </div>

      <TechnicalAnalysis symbol={"NASDAQ:AAPL"} dark locale="es" />

      <MarketOverview locale="es" />
    </div>
  );
}

/* <!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div id="tradingview_ef43a"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "width": 980,
  "height": 610,
  "symbol": "NASDAQ:AAPL",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "light",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "allow_symbol_change": true,
  "container_id": "tradingview_ef43a"
}
  );
  </script>
</div>
<!-- TradingView Widget END --> */
