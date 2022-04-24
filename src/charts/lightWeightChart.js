import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { useLocation } from 'react-router-dom';
import "./styles.css";

export default function LightWeightChartSelf() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const location = useLocation();
  
    const arr = [];
    const vol = [];
    const mov = [];
    const exponentialMovingAverage=[];
    let ema=0;
    const today = Math.ceil((new Date().getTime())/1000);
    const lastYear = Math.ceil((new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime())/1000);
   console.log(today);
   console.log(lastYear);
    const url ="https://finnhub.io/api/v1/stock/candle?symbol=".concat(location.state.Symbol,"&resolution=D&from=",lastYear,"&to=",today,"&token=c94i99aad3if4j50rvn0")
    //var str={"time":'2022-1-1',"open":50,"high":45,"low":34,"close":34};
    //console.log(url);
    let API_Call = url;
    let maxima=0;
    let minima=100000;
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
         // console.log(data);
          var co = 1;
          var avr = 0;
          time.forEach((num1, key) =>{
            var tim = new Date(time[key] * 1000)
            var newTime = tim.toLocaleDateString("en-US");
            //console.log(newTime);
            let temClose=parseInt(close[key], 10);
            maxima=Math.max(maxima,parseInt(close[key], 10));
            minima= Math.min(minima,parseInt(close[key], 10));
            var aa = {
              time: newTime,
              open: parseInt(open[key], 10),
              high: parseInt(high[key], 10),
              low: parseInt(low[key], 10),
              close: parseInt(close[key], 10)
            };
            if(co===1)
            {
              ema=parseInt(close[key], 10);
            }
            else{
              ema=ema+(temClose-ema)*(2/(15+1));
            }
            var dd={
              time:newTime,
              value:ema
            }
            exponentialMovingAverage.push(dd);
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
          console.log(exponentialMovingAverage);
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

          console.log(maxima);

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
                minValue: maxima,
                maxValue: minima
              },
              margins: {
                above: (maxima-minima)/20,
                below: (maxima-minima)/20
              }
            })
          });

          areaSeries.setData(mov);

          const exponentialMovingAverageSeries = chart.current.addLineSeries({
            color: "#FF5733",
            lineStyle: 0,
            lineWidth: 1,
            crosshairMarkerVisible: true,
            crosshairMarkerRadius: 6,
            crosshairMarkerBorderColor: "#ffffff",
            crosshairMarkerBackgroundColor: "#2296f3",
            lineType: 1,
            autoscaleInfoProvider: () => ({
              priceRange: {
                minValue: maxima,
                maxValue: minima
              },
              margins: {
                above: (maxima-minima)/20,
                below: (maxima-minima)/20
              }
            })
          });

          exponentialMovingAverageSeries.setData(exponentialMovingAverage);

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
            price: (maxima+minima)/2,
            color: "green",
            lineWidth: 2,

            axisLabelVisible: true,
            title: "P/L 500"
          });

          priceLine.applyOptions({
            price: (maxima+minima)/2,
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


