import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";  // Add this import
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./Kambaz/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);