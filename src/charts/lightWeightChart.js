import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { createChart, CrosshairMode } from "lightweight-charts";
//import { priceData } from "./priceData";
//import { areaData } from './areaData';
//import { volumeData } from "./volumeData";

import "./styles.css";

export default function LightWeightChartSelf() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  
    const arr = [];
    const vol = [];
    const mov = [];
    //var str={"time":'2022-1-1',"open":50,"high":45,"low":34,"close":34};
    let API_Call = `https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1618670788&to=1650205236&token=c94i99aad3if4j50rvn0`;
    const fetchData = async () => {
      await fetch(API_Call)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let close = data["c"];
          let open = data["o"];
          let volume = data["v"];
          let time = data["t"];
          let high = data["h"];
          let low = data["l"];
          console.log(data);
          var co = 1;
          var avr = 0;
          time.forEach((num1, key) =>{
            var tim = new Date(time[key] * 1000)
            var newTime = tim.toLocaleDateString("en-US");
            console.log(newTime);
            var aa = {
              time: newTime,
              open: parseInt(open[key], 10),
              high: parseInt(high[key], 10),
              low: parseInt(low[key], 10),
              close: parseInt(close[key], 10)
            };
            var closePrice = parseInt(close[key], 10);
            avr = (avr * (co - 1) + closePrice) / co;
            var cc = {
              time: newTime,
              value: avr
            };
            var bb = {
              time: newTime,
              value: parseInt(volume[key], 10)
            };
            co++;
            vol.push(bb);
            arr.push(aa);
            mov.push(cc);
          })
          console.log(arr);
          console.log("2");
          chart.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
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
                minValue: 130,
                maxValue: 210
              },
              margins: {
                above: 2,
                below: 2
              }
            })
          });

          areaSeries.setData(mov);

          areaSeries.setMarkers([
            {
              time: "2022-03-09",
              position: "aboveBar",
              color: "black",
              shape: "arrowDown"
            },
            {
              time: "2022-02-19",
              position: "belowBar",
              color: "red",
              shape: "arrowUp",
              id: "id3"
            },
            {
              time: "2022-02-14",
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
            price: 150.0,
            color: "green",
            lineWidth: 2,

            axisLabelVisible: true,
            title: "P/L 500"
          });

          priceLine.applyOptions({
            price: 150.0,
            color: "red",
            lineWidth: 3,
            axisLabelVisible: false,
            title: "P/L 600"
          });
          const coordinate = areaSeries.priceToCoordinate(150.5);
          console.log(coordinate);
          const screenshot = chart.current.takeScreenshot();

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
        });

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
    };
    useEffect(() => {
    fetchData();
  });


  return (
    <div className="App">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
}


