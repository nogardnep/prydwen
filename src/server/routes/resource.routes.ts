// TODO: delete?

import * as express from 'express';
import { ResourceController } from '../controllers/resource.controller';
const router = express.Router();

router.get('/global/files/', ResourceController.getAllGlobal);
router.get('/global/files/:types', ResourceController.getAllGlobal);
router.get('/global/src/*', ResourceController.getOneGlobal);
router.get('/local/:projectName/files/', ResourceController.getAllLocal);
router.get('/local/:projectName/files/:types', ResourceController.getAllLocal);
router.get('/local/:projectName/src/*', ResourceController.getOneLocal);

module.exports = router;
