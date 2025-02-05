import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropType from "prop-types";

const client = new QueryClient();

const TanStackQueryProvider = ({ children }) => (
  <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
  </QueryClientProvider>
);

TanStackQueryProvider.propTypes = {
  children: PropType.element,
};

export default TanStackQueryProvider;
