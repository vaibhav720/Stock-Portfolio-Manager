import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Dashboard/Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Quotes( ) {
        const [quotesData,setQuotesData] = React.useState({}) ;
        React.useEffect(async () => {
        await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=GGYN50DSU734HJ1G`).then(res => {
            const pData = res.data["Global Quote"];
            setQuotesData(pData);
            console.log(quotesData["01. symbol"]);
          })
        }, []);
      

  return (
    <React.Fragment>
      <Title>Quotes</Title>
      <Typography component="p" variant="h5">
        Symbol: {quotesData["01. symbol"]}
      </Typography>
      <Typography component="p" variant="h6">
        Open: {quotesData["02. open"]}
      </Typography>
      <Typography component="p" variant="h6">
        Volume: {quotesData["06. volume"]}
      </Typography>
      <Typography component="p" variant="h6">
        Price: {quotesData["05. price"]}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Percentage {quotesData["10. change percent"]}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}