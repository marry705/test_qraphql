import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

import server from './server';
import dpp from './dir/initDirectoryPath';

const directoryPath = path.join(__dirname, '../files/');
dpp.setPath(directoryPath);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/files', express.static(path.join(__dirname, '../files')));

server.applyMiddleware({ app, path: '/api' });

export default app;
