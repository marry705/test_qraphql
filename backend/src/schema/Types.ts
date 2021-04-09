import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';

export const FileType = new GraphQLObjectType({
  name: 'File',
  description: 'A stored file.',
  fields: () => ({
    filename: {
      description: 'Where it’s stored in the filesystem.',
      type: GraphQLNonNull(GraphQLString),
    },
    id: {
      description: 'Unique ID.',
      type: GraphQLNonNull(GraphQLID),
    },
  }),
});

export const DownloadResult = new GraphQLObjectType({
  name: 'DownloadResult',
  description: 'A download result.',
  fields: () => ({
    success: {
      description: 'Success state.',
      type: GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
