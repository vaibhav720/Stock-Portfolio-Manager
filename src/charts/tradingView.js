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
          locale="en"
          autosize
        />
      </div>

      <TechnicalAnalysis symbol={"NASDAQ:AAPL"} dark locale="es" />

      <MarketOverview locale="en" />
    </div>
  );
}

