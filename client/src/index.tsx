import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./assets/globalStyles.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);
root.render(<App />);
