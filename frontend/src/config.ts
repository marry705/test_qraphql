import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { GRAPHQL_ENDPOINT } from './constants';

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
    uri: GRAPHQL_ENDPOINT,
  }),
  defaultOptions,
});
