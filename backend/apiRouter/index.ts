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
    if (req.body) {
      res.status(200);
    }
    res.status(400);
  },
);

export default apiRouter;
