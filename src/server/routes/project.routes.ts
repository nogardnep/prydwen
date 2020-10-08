import * as express from 'express';
import { ProjectController } from '../controllers/project.controller';
const router = express.Router();

router.get('/', ProjectController.getAll);
router.get('/*', ProjectController.getOne);
router.post('/update/*', ProjectController.update);
router.post('/create', ProjectController.create);
router.delete('/*', ProjectController.delete);

module.exports = router;
