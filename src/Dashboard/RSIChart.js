import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useEffect, useRef } from "react";
// Generate RSI Data

export default function Chart(props) {
  const theme = useTheme();
  const RSI = [];
  let prevClose = 0;
  let up = 0;
  let dn = 0;
  let upAverage = 0;
  let dnAverage = 0;
  const today = Math.ceil(new Date().getTime() / 1000);
  const lastYear = Math.ceil(
    new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).getTime() / 1000
  );
  const url = "https://finnhub.io/api/v1/stock/candle?symbol=".concat(
    props.symbol,
    "&resolution=D&from=",
    lastYear,
    "&to=",
    today,
    "&token=c94i99aad3if4j50rvn0"
  );

  const fetchData = async () => {
    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let close = data["c"];
        let time = data["t"];

        var co = 1;
        var avr = 0;
        time.forEach((num1, key) => {
          var tim = new Date(time[key] * 1000);
          var hrs = tim.getHours();
          var minutes = tim.getMinutes();
          var FormatDate = tim.getDate();
          var newTime = tim.toLocaleDateString("en-US");

          let temClose = close[key];
          if (temClose > prevClose) {
            up = temClose - prevClose;
            dn = 0;
          } else {
            dn = prevClose - temClose;
            up = 0;
          }
          prevClose = temClose;
          upAverage = (upAverage * (co - 1) + up) / co;
          dnAverage = (dnAverage * (co - 1) + dn) / co;
          let temRSI = (100 * upAverage) / (upAverage + dnAverage);
          RSI.push({ time: FormatDate, amount: temRSI });
          co++;
        });
      });
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <React.Fragment>
      <Title>Relative Strength Index</Title>
      <ResponsiveContainer>
        <LineChart
          data={RSI}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Percent (%)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
