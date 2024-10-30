import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthProvider } from "contexts/AuthContext";

import './styles/styles.css';
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <AuthProvider>
      <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}
