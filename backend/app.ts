import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: ['http://localhost:4000'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../dist/')));
app.use('/files', express.static(path.join(__dirname, '../files')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', 'index.html'));
});

export default app;
