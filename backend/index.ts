import { ApolloServer, gql } from 'apollo-server-express';
import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = new ApolloServer({
  typeDefs: gql`
    type File {
      url: String!
    }
    type Query {
      files: [String]!
    }
    type Mutation {
      uploadFile(file: Upload!): Boolean
    }
  `,
  resolvers: {
    Query: {
      files: () => [File],
    },
    Mutation: {
      uploadFile: async (_, { file }) => {
        const { stream, filename } = await file;
        const pathName = path.join(__dirname, `../files/${filename}`);
        await stream.pape(fs.createWriteStream(pathName));
        return true;
        // return {
        //   url: `http://localhost:4000/files/${filename}`,
        // };
      },
    },
  },
});

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: ['http://localhost:4000'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../dist/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', 'index.html'));
});

server.applyMiddleware({ app });
// app.use('/app', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.listen({ port: 4000 }, () => console.log('🚀 Server ready'));
