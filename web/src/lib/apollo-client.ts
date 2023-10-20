import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();
};
const authLink = setContext(async (_, { headers }) => {
  const token = getCookie("next-auth.session-token");

  return {
    headers: {
      ...headers,
      ...(!!token && { authorization: `Bearer ${token}` }),
    },
  };
});

// TODO: Websocket link

const uploadLink = createUploadLink({
  uri: "http://localhost:3333/graphql",
  headers: {
    "apollo-require-preflight": "true",
  },
});

import { GraphQLError } from "graphql";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { __DEV__ } from "@apollo/client/utilities/globals";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ message, locations, path, extensions }: GraphQLError) => {
        console.log(
          `[GraphQl Error]: Message ${message}, Location: ${locations}, Path: ${path}, Extensions: ${JSON.stringify(
            extensions,
          )}`,
        );
      },
    );
  }

  if (networkError) {
    console.log(`[Network Error]: ${networkError}`);
  }
});

// TODO: splitlink for websockets and http

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(uploadLink)),
  cache,
});
