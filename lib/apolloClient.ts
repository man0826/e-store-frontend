import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
// import "cross-fetch/polyfill";
import { setContext } from "@apollo/client/link/context";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";

// export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = (ctx?: GetServerSidePropsContext) => {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const { token } = nookies.get(ctx);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (ctx?: GetServerSidePropsContext) => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};
