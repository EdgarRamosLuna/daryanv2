import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "./context/MainContext";
import GlobalStyle from "./styles/GobalStyles";
import { LanguageProvider } from "./context/LanguageProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MainContextProvider>
      <LanguageProvider>
        <GlobalStyle />
        <App />
      </LanguageProvider>
    </MainContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
