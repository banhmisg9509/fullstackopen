import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./stores";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
