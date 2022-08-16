import * as React from "react";
import { Suspense } from "react";
import NewsLoad from "../charts/NewsLoad";
import Stocks from "./Stocks";




function DashboardContent() {

  return (<>
              <Stocks/>
              <br/>
              <NewsLoad basic="news?category=general"/>
              </>
  );
}

export default function MarketNews(async) {
  
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <DashboardContent />
    </Suspense>
  );
}
