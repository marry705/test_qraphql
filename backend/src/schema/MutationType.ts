import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import { DownloadResult } from './Types';


const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    uploadFile: {
      description: 'Stores a single file.',
      type: GraphQLNonNull(DownloadResult),
      args: {
        file: {
          description: 'File to store.',
          type: GraphQLNonNull(GraphQLUpload),
        },
      },
      resolve: (parent, { file }, { storeUpload }) => storeUpload(file),
    },
  }),
});

export default MutationType;
