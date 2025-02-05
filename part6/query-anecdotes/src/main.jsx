import ReactDOM from "react-dom/client";
import App from "./App";
import TanStackQueryProvider from "src/queries";
import JotaiProvider from "src/stores/JotaiProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TanStackQueryProvider>
    <JotaiProvider>
      <App />
    </JotaiProvider>
  </TanStackQueryProvider>
);
