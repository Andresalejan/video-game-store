/**
 * App entry point.
 *
 * Purpose:
 * - Boots React into the #root element.
 * - Wraps the app in the Redux <Provider> so components can access the store.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
