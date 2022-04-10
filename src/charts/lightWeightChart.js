import React, { useEffect, useRef } from "react";

import { createChart, CrosshairMode } from "lightweight-charts";

export default function LightWeight(props) {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    const arr = [];
    const vol = [];
    const mov = [];
    function updatedata() {
      console.log(22);

      var co = 1;
      var avr = 0;
      for (var key in props.apidata) {
        if (!props.apidata.hasOwnProperty(key)) continue;
        var aa = {
          time: key,
          open: parseInt(props.apidata[key]["1. open"], 10),
          high: parseInt(props.apidata[key]["2. high"], 10),
          low: parseInt(props.apidata[key]["3. low"], 10),
          close: parseInt(props.apidata[key]["4. close"], 10)
        };
        var closePrice = parseInt(props.apidata[key]["4. close"], 10);
        avr = (avr * (co - 1) + closePrice) / co;
        var cc = {
          time: key,
          value: avr
        };
        var bb = {
          time: key,
          value: parseInt(props.apidata[key]["5. volume"], 10)
        };
        co++;
        vol.push(bb);
        arr.push(aa);
        mov.push(cc);
      }
    }
    updatedata();
    console.log("2");
    chart.current = createChart(chartContainerRef.current, {
      width: 600,
      height: 500,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)"
      },
      grid: {
        vertLines: {
          color: "#334158"
        },
        horzLines: {
          color: "#334158"
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal
      },
      priceScale: {
        borderColor: "#485c7b"
      },
      timeScale: {
        borderColor: "#485c7b"
      }
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1"
    });
    console.log("3");
    candleSeries.setData(arr);

    const areaSeries = chart.current.addLineSeries({
      color: "#f48fb1",
      lineStyle: 0,
      lineWidth: 1,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
      crosshairMarkerBorderColor: "#ffffff",
      crosshairMarkerBackgroundColor: "#2296f3",
      lineType: 1,
      autoscaleInfoProvider: () => ({
        priceRange: {
          minValue: 800,
          maxValue: 2700
        },
        margins: {
          above: 100,
          below: 100
        }
      })
    });

    areaSeries.setData(mov);

    areaSeries.setMarkers([
      {
        time: "2019-04-09",
        position: "aboveBar",
        color: "black",
        shape: "arrowDown"
      },
      {
        time: "2019-05-31",
        position: "belowBar",
        color: "red",
        shape: "arrowUp",
        id: "id3"
      },
      {
        time: "2019-05-31",
        position: "belowBar",
        color: "orange",
        shape: "arrowUp",
        id: "id4",
        text: "example",
        size: 2
      }
    ]);

    chart.current.subscribeCrosshairMove((param) => {
      // console.log(param.hoveredMarkerId);
    });

    chart.current.subscribeClick((param) => {
      //console.log(param.hoveredMarkerId);
    });

    const priceLine = areaSeries.createPriceLine({
      price: 2500.0,
      color: "green",
      lineWidth: 2,

      axisLabelVisible: true,
      title: "P/L 500"
    });

    priceLine.applyOptions({
      price: 2700.0,
      color: "red",
      lineWidth: 3,
      axisLabelVisible: false,
      title: "P/L 600"
    });
    const coordinate = areaSeries.priceToCoordinate(2500.5);
    console.log(coordinate);
    //const screenshot = chart.current.takeScreenshot();

    const volumeSeries = chart.current.addHistogramSeries({
      color: "#182233",
      lineWidth: 4,
      priceFormat: {
        type: "volume"
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0
      }
    });
    console.log("4");
    volumeSeries.setData(vol);

    console.log("1");
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  });

  return (
    <div className="App">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
}

const columns=[
  {"field":"id","headerName":"ID"},
  {"field":"desk","headerName":"desk"},
  {"field":"fiscalDateEnding","headerName":"fiscalDateEnding"},
  {"field":"reportedCurrency","headerName":"reportedCurrency"},
  {"field":"operatingCashflow","headerName":"operatingCashflow"},
  {"field":"paymentsForOperatingActivities","headerName":"paymentsForOperatingActivities"},
  {"field":"proceedsFromOperatingActivities","headerName":"proceedsFromOperatingActivities"},
  {"field":"changeInOperatingLiabilities","headerName":"changeInOperatingLiabilities"},
  {"field":"changeInOperatingAssets","headerName":"changeInOperatingAssets"},
  {"field":"depreciationDepletionAndAmortization","headerName":"depreciationDepletionAndAmortization"},
  {"field":"capitalExpenditures","headerName":"capitalExpenditures"},
  {"field":"changeInReceivables","headerName":"changeInReceivables"},
  {"field":"changeInInventory","headerName":"changeInInventory"},
  {"field":"profitLoss","headerName":"profitLoss"},
  {"field":"cashflowFromInvestment","headerName":"cashflowFromInvestment"},
  {"field":"cashflowFromFinancing","headerName":"cashflowFromFinancing"},
  {"field":"proceedsFromRepaymentsOfShortTermDebt","headerName":"proceedsFromRepaymentsOfShortTermDebt"},
  {"field":"paymentsForRepurchaseOfCommonStock","headerName":"paymentsForRepurchaseOfCommonStock"},
  {"field":"paymentsForRepurchaseOfEquity","headerName":"paymentsForRepurchaseOfEquity"},
  {"field":"paymentsForRepurchaseOfPreferredStock","headerName":"paymentsForRepurchaseOfPreferredStock"},
  {"field":"dividendPayout","headerName":"dividendPayout"},
  {"field":"dividendPayoutCommonStock","headerName":"dividendPayoutCommonStock"},
  {"field":"dividendPayoutPreferredStock","headerName":"dividendPayoutPreferredStock"},
  {"field":"proceedsFromIssuanceOfCommonStock","headerName":"proceedsFromIssuanceOfCommonStock"},
  {"field":"proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet","headerName":"proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet"},
  {"field":"proceedsFromIssuanceOfPreferredStock","headerName":"proceedsFromIssuanceOfPreferredStock"},
  {"field":"proceedsFromRepurchaseOfEquity","headerName":"proceedsFromRepurchaseOfEquity"},
  {"field":"proceedsFromSaleOfTreasuryStock","headerName":"proceedsFromSaleOfTreasuryStock"},
  {"field":"changeInCashAndCashEquivalents","headerName":"changeInCashAndCashEquivalents"},
  {"field":"changeInExchangeRate","headerName":"changeInExchangeRate"},
  {"field":"netIncome","headerName":"netIncome"}
];

