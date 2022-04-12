import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { createChart, CrosshairMode } from "lightweight-charts";


export default function LightWeightChart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    const arr = [];
    const vol = [];
    const mov = [];
    //var str={"time":'2022-1-1',"open":50,"high":45,"low":34,"close":34};
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=A3QPG0GAAYX8VGI2`;
    const fetchData = async () => {
      await fetch(API_Call)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let time = data["Time Series (Daily)"];
          console.log(time);
          var co = 1;
          var avr = 0;
          for (var key in time) {
            if (!time.hasOwnProperty(key)) continue;
            var aa = {
              time: key,
              open: parseInt(time[key]["1. open"], 10),
              high: parseInt(time[key]["2. high"], 10),
              low: parseInt(time[key]["3. low"], 10),
              close: parseInt(time[key]["4. close"], 10)
            };
            var closePrice = parseInt(time[key]["4. close"], 10);
            avr = (avr * (co - 1) + closePrice) / co;
            var cc = {
              time: key,
              value: avr
            };
            var bb = {
              time: key,
              value: parseInt(time[key]["5. volume"], 10)
            };
            co++;
            vol.push(bb);
            arr.push(aa);
            mov.push(cc);
            
          }
          console.log(vol);
            console.log(arr);
            console.log(mov);
          console.log("2");
          chart.current = createChart(chartContainerRef.current, {
            width: 600,
            height: 400,
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
          console.log(5);
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
            price: 2000.0,
            color: "red",
            lineWidth: 3,
            axisLabelVisible: false,
            title: "P/L 600"
          });
          const coordinate = areaSeries.priceToCoordinate(2500.5);
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
    fetchData();
  },[]);


  return (
    <div className="App">
      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
}

