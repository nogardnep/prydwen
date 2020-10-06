import * as express from 'express';
import { FileController } from '../controllers/file.controller';
const router = express.Router();

// TODO: find a better way

router.get('/path/:types/*', FileController.getAll);
router.get('/src/*', FileController.getSrc);



module.exports = router;
