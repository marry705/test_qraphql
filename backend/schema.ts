import { gql, IResolvers } from 'apollo-server-express';
import path from 'path';
import { createWriteStream, readdir } from 'fs';
import { DocumentNode } from '@apollo/client';

export const typeDefs: DocumentNode = gql`
     type DownloadResult {
      success: Boolean!
    }
    type Query {
      files: [String]!
    }
    type Mutation {
      uploadFile(file: Upload!): DownloadResult!
    }
`;

export const resolvers: IResolvers = {
  Query: {
    files: async (): Promise<string[] | Error> => {
      const directoryPath = path.join(__dirname, '../files/');
      return new Promise((resolve, reject) => {
        readdir(directoryPath, (error, files: string[]) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(files);
        });
      });
    },
  },
  Mutation: {
    uploadFile: async (parent, { file }): Promise<{ 'success': boolean } | Error> => {
      const {
        createReadStream, filename,
      } = await file;
      const pathName = path.join(__dirname, `../files/${filename}`);
      const readStream = createWriteStream(pathName);
      return new Promise((resolve, reject) => {
        createReadStream()
          .pipe(readStream)
          .on('finish', () => resolve({ success: true }))
          .on('error', () => reject(new Error('Failed to load video')));
      });
    },
  },
};
