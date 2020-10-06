import * as express from 'express';
import { ProjectController } from '../controllers/project.controller';
const router = express.Router();

router.get('/', ProjectController.getAll);
router.get('/*', ProjectController.getOne);
router.post('/*', ProjectController.updateOne);

module.exports = router;
