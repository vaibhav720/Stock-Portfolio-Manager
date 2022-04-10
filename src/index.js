import * as React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import MultiActionAreaCard from "./Cards/card";
import SignInSide from "./Registration/signin";
import Dashboard from "./Dashboard/Dashboard";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Dashboard />
  </StyledEngineProvider>,
  document.querySelector("#root")
);
