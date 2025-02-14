import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { clearToken } from "src/stores/token";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if (
      graphQLErrors.some(
        (error) => error.extensions.code === "UNAUTHORIZED_ERROR"
      )
    ) {
      clearToken();
    }
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("TOKEN");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${JSON.parse(token)}` : null,
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
