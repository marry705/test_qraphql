import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { GRAPHQL_ENDPOINT } from './constants';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
};

export const config = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: GRAPHQL_ENDPOINT,
  }),
  defaultOptions,
});
