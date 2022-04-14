import * as React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import MultiActionAreaCard from "./Cards/card";
import SignInSide from "./Registration/SignIn";
import Dashboard from "./Dashboard/Dashboards";
import Advchart from "./Dashboard/Advchart";
import Home from "./Dashboard/Home"
import App from "./App";
ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  document.querySelector("#root")
);
