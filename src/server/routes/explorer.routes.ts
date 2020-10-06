import * as express from 'express';
import { ExplorerController } from '../controllers/explorer.controller';
const router = express.Router();

router.get('/', ExplorerController.getAll);

module.exports = router;
