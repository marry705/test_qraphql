import { gql, IResolvers } from 'apollo-server-express';
import path from 'path';
import {
  createWriteStream, readdir, existsSync, mkdirSync,
} from 'fs';
import { promisify } from 'util';
import { DocumentNode } from '@apollo/client';
import dpp from './initDirectoryPath';

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
    files: async (): Promise<void> => {
      const stat = promisify(readdir);
      return stat(dpp.getPath()).then((files: string[]) => files).catch((error) => error);
    },
  },
  Mutation: {
    uploadFile: async (parent, { file }): Promise<{ 'success': boolean }> => {
      const { createReadStream, filename } = await file;
      if (!existsSync(dpp.getPath())) {
        mkdirSync(dpp.getPath());
      }
      const pathName = path.join(dpp.getPath(), filename);
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
