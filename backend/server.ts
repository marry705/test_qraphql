/* eslint-disable prefer-promise-reject-errors */
import { ApolloServer, gql } from 'apollo-server-express';
import path from 'path';
import { createWriteStream, readdir } from 'fs';

const server = new ApolloServer({
  typeDefs: gql`
    type Response {
      success: Boolean!
    }
    type Query {
      files: [String]
    }
    type Mutation {
      uploadFile(file: Upload!): Response!
    }
`,
  resolvers: {
    Query: {
      files: async () => {
        const directoryPath = path.join(__dirname, '../files/');
        return new Promise((resolve, reject) => {
          readdir(directoryPath, (error, files: string[]) => {
            if (error) {
              reject([]);
            }
            resolve(files);
          });
        });
      },
    },
    Mutation: {
      uploadFile: async (parent, { file }) => {
        const {
          createReadStream, filename,
        } = await file;
        const pathName = path.join(__dirname, `../files/${filename}`);
        const readStream = createWriteStream(pathName);
        return new Promise((resolve, reject) => {
          createReadStream()
            .pipe(readStream)
            .on('finish', () => resolve({ success: true }))
            .on('error', () => reject({ success: false }));
        });
      },
    },
  },
});

export default server;
