import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";
import reportWebVitals from "./reportWebVitals";
import { RefProvider } from "./context/RefContext";
import { WeatherProvider } from "./context/WeatherContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RefProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </RefProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
