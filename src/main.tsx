import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
// import { Predictions } from "aws-amplify/predictions";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

// Amplify.configure({
//   ...Amplify.getConfig(),
//   Predictions: config.custom.Predictions,
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
