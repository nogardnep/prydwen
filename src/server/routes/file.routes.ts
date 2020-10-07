import { config } from './../../config/config';
import * as express from 'express';
import { FileController } from '../controllers/file.controller';
const router = express.Router();
const multer = require('multer');

const audioUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const path = req.params[0];
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
    },
  }),
});

// TODO: find bettern way to get path information

router.get('/path/:types/*', FileController.getAll);
router.get('/src/*', FileController.getSrc);
router.post(
  '/path/*',
  audioUpload.single(config.uploadId),
  FileController.storeFile
);

module.exports = router;
