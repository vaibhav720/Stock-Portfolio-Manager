let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=A3QPG0GAAYX8VGI2`;
export function fetchData() {
  fetch(API_Call)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let time = data["Time Series (Daily)"];
      console.log(time);
      return time;
    });
}
