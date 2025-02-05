import ReactDOM from "react-dom/client";
import App from "./App";
import TanStackQueryProvider from "src/queries";
import JotaiProvider from "src/stores/JotaiProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TanStackQueryProvider>
    <JotaiProvider>
      <App />
    </JotaiProvider>
  </TanStackQueryProvider>
);
