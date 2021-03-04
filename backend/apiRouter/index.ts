import express from 'express';
import ErrorHandler from '../errorHandler/errorHandler';

const apiRouter = express.Router();

apiRouter.route('/get').get(
  async (req, res, next) => {
    res.status(200).send('Hello');
  },
);

apiRouter.route('/upload').post(
  async (req, res, next) => {
    res.status(200).send('upload');
  },
);

export default apiRouter;
