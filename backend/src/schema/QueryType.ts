import { GraphQLList, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { FileType } from './Types';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    files: {
      description: 'All stored files.',
      type:  GraphQLNonNull(GraphQLList(FileType)),
      resolve: (source, args, { db }) => db.getField(),
    },
  }),
});

export default QueryType;
