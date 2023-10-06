import React from "react";
import ReactDOM from "react-dom/client";
import { DarkModeProvider } from "./contexts/Darkmode/DarkModeContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DarkModeProvider>
);
