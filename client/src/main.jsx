import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { WarrantyCardProvider } from "./context/WarrantyCardContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <WarrantyCardProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WarrantyCardProvider>
);
