"use client";

import {
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  ApolloNextAppProvider
} from "@apollo/experimental-nextjs-app-support/ssr";

import { getServerAuthSession } from '~/server/auth';

function makeClient() {
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

  const link = authLink.concat(httpLink);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            link,
          ])
        : link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
