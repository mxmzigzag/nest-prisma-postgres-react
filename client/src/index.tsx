import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";

import App from "./app";

import "./assets/globalStyles.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
