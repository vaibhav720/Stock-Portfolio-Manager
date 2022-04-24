
import React from 'react';
import {useEffect} from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
const columns : GridColDef[] = [
  { field: "desk", headerName: "desk" },
  { field: "fiscalDateEnding", headerName: "fiscalDateEnding" },
  { field: "reportedCurrency", headerName: "reportedCurrency" },
  { field: "operatingCashflow", headerName: "operatingCashflow" },
  {
    field: "paymentsForOperatingActivities",
    headerName: "paymentsForOperatingActivities"
  },
  {
    field: "proceedsFromOperatingActivities",
    headerName: "proceedsFromOperatingActivities"
  },
  {
    field: "changeInOperatingLiabilities",
    headerName: "changeInOperatingLiabilities"
  },
  { field: "changeInOperatingAssets", headerName: "changeInOperatingAssets" },
  {
    field: "depreciationDepletionAndAmortization",
    headerName: "depreciationDepletionAndAmortization"
  },
  { field: "capitalExpenditures", headerName: "capitalExpenditures" },
  { field: "changeInReceivables", headerName: "changeInReceivables" },
  { field: "changeInInventory", headerName: "changeInInventory" },
  { field: "profitLoss", headerName: "profitLoss" },
  { field: "cashflowFromInvestment", headerName: "cashflowFromInvestment" },
  { field: "cashflowFromFinancing", headerName: "cashflowFromFinancing" },
  {
    field: "proceedsFromRepaymentsOfShortTermDebt",
    headerName: "proceedsFromRepaymentsOfShortTermDebt"
  },
  {
    field: "paymentsForRepurchaseOfCommonStock",
    headerName: "paymentsForRepurchaseOfCommonStock"
  },
  {
    field: "paymentsForRepurchaseOfEquity",
    headerName: "paymentsForRepurchaseOfEquity"
  },
  {
    field: "paymentsForRepurchaseOfPreferredStock",
    headerName: "paymentsForRepurchaseOfPreferredStock"
  },
  { field: "dividendPayout", headerName: "dividendPayout" },
  {
    field: "dividendPayoutCommonStock",
    headerName: "dividendPayoutCommonStock"
  },
  {
    field: "dividendPayoutPreferredStock",
    headerName: "dividendPayoutPreferredStock"
  },
  {
    field: "proceedsFromIssuanceOfCommonStock",
    headerName: "proceedsFromIssuanceOfCommonStock"
  },
  {
    field: "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet",
    headerName: "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet"
  },
  {
    field: "proceedsFromIssuanceOfPreferredStock",
    headerName: "proceedsFromIssuanceOfPreferredStock"
  },
  {
    field: "proceedsFromRepurchaseOfEquity",
    headerName: "proceedsFromRepurchaseOfEquity"
  },
  {
    field: "proceedsFromSaleOfTreasuryStock",
    headerName: "proceedsFromSaleOfTreasuryStock"
  },
  {
    field: "changeInCashAndCashEquivalents",
    headerName: "changeInCashAndCashEquivalents"
  },
  { field: "changeInExchangeRate", headerName: "changeInExchangeRate" },
  { field: "netIncome", headerName: "netIncome" }
];
let co = 1;


export default function Table(props) {
  
const [rows: GridRowsProp,setRows] =React.useState([]);
  const [quarterlyReports, setQuarterlyReports] = React.useState([]);
  const tem=[];
  const fetchData = () => {
    const url ="https://www.alphavantage.co/query?function=CASH_FLOW&symbol=".concat(props.symbol,"&apikey=A3QPG0GAAYX8VGI2"); 
    //console.log(url);
    axios
      .get(
        url
      )
      .then((res) => {
        const pData = res.data["quarterlyReports"];
        
        setQuarterlyReports(pData);
       // console.log(pData);
        for (var key in quarterlyReports) {
          if (!quarterlyReports.hasOwnProperty(key)) continue;
          tem[key] = { id: co, desk: co };
          tem[key] = { ...tem[key], ...quarterlyReports[key] };

          co++;
        }
        //console.log("rows");
        
        setRows(tem);
       // console.log(tem);
      });
    }
    useEffect(() => {
      fetchData()
      }, [])
  
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}