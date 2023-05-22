import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { CurrencyProvider } from "./context/CurrencyContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>
);
