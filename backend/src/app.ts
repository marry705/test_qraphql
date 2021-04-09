import express from 'express';
import path from 'path';
import { graphqlUploadExpress } from 'graphql-upload';
import { mkdirSync, existsSync } from 'fs';

import server from './server';
import dpp from './dir/initDirectoryPath';
import db from './db/initDB';

const directoryPath = path.join(__dirname, '../files/');
const maxFileSize = 1024*1024*128*128;
const maxFiles = 10;
dpp.setPath(directoryPath);
db.createDB('db');

if (!existsSync(dpp.getPath())) {
    mkdirSync(dpp.getPath());
}

const app = express().use(graphqlUploadExpress({ maxFileSize, maxFiles }));
app.use('/files', express.static(directoryPath));

server.applyMiddleware({ app, path: process.env.API || '/api' });

export default app;
