// Webブラウザと各コンポーネントの中継の役割

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";  // ReactとWebブラウザを通信するライブラリをimport
import "./styles.css";

import App from "./App";  // App.js内に作成したコンポーネントをimport

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);