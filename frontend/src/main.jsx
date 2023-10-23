import React from "react";
import ReactDOM from "react-dom/client";
import { DarkModeProvider } from "./contexts/DarkMode/DarkModeContext";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DarkModeProvider>
);
