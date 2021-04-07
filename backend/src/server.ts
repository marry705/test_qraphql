import { ApolloServer } from 'apollo-server-express';
import { GraphQLError } from 'graphql';

import schema from './schema';
import db from './db';
import storeUpload from './storeUpload';


const server = new ApolloServer({
  uploads: false,
  schema,
  context: { db, storeUpload },
  formatError: (error: GraphQLError): Error => {
    console.log('Error while running resolver', { error });
    return new Error('Internal server error');
  },
});

export default server;
