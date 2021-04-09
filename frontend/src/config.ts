import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'none',
  },
};

export const config = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.GRAPHQL_ENDPOINT,
  }),
  defaultOptions,
});
