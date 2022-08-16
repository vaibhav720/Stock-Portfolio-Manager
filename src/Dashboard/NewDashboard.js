import * as React from "react";
import { Suspense} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./RSIChart";
import Orders from "./Orders";
import FullFeaturedDemo from "../tables";
//import { fetchData } from "../charts/data.js";
import TradingWidget from "../charts/tradingView";
import Quotes from "../charts/Quotes";
import NewsLoad from "../charts/NewsLoad";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';





function DashboardContent() {

  const history = useNavigate();
  const location = useLocation();
if(location.state.Symbol===null)
{
  history('/');
}


  function AdvanceChart(props)
  {
    console.log("CALLING LIGHT WEIGHT CHART",props);
    history("/lightWeight",{state:props});
  }
  return (
 
            
              <>
              
              
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240
                  }}
                >
                  <Chart symbol={location.state.Symbol}/>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240
                  }}
                >
                  <Quotes symbol={location.state.Symbol} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders symbol={location.state.Symbol}/>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <FullFeaturedDemo symbol={location.state.Symbol}/>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Suspense fallback={<h1>Loading profile...</h1>}>
                    <TradingWidget symbol={location.state.Symbol}/>
                  </Suspense>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Button onClick={()=>AdvanceChart(location.state)} >Advance Chart</Button>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <NewsLoad symbol={location.state.Symbol} basic="company-news?symbol="/>
              
              </>
            
  );
}

export default function NewDashboard(async) {
  
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <DashboardContent />
    </Suspense>
  );
}
