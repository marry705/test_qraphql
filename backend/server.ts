import { ApolloServer } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error: GraphQLError): Error => {
    console.log('Error while running resolver', { error });
    return new Error('Internal server error');
  },
});

export default server;
