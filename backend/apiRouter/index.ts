import express from 'express';
import { UploadedFile } from 'express-fileupload';
import ErrorHandler from '../errorHandler/errorHandler';

const apiRouter = express.Router();

apiRouter.route('/get').get(
  async (req, res, next) => {
    res.status(200).send('Hello');
  },
);

apiRouter.route('/upload').post(
  async (req, res, next) => {
    if (!req.files) {
      throw new ErrorHandler(404, 'Not correct email or password');
    }
    const uploadFile: UploadedFile | UploadedFile[] = req.files.file;
    const fileName = (<UploadedFile>uploadFile).name;
    (<UploadedFile>uploadFile).mv(
      `${__dirname}/files/${fileName}`,
      (error: Error) => {
        if (error) {
          next(error);
        }
        res.status(200);
      },
    );
  },
);

export default apiRouter;
