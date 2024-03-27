import { ApolloClient, HttpLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getServerAuthSession } from "~/server/auth";

const httpLink = createHttpLink({
  uri: process.env.BFF_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getServerAuthSession();

  if (session && session.accessToken) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${session.accessToken}`,
      },
    };
  }
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
});
