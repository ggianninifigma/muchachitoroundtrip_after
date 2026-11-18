import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { initAnalytics } from "./analytics/amplitude";
import "./styles/global.css";

// Initialize Amplitude (autocapture page views + frustration, session replay)
// as early as possible, before the app renders.
initAnalytics();

// Strip BASE_URL's trailing slash for React Router (basename must not end in /).
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename}>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </BrowserRouter>,
);
