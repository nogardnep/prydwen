import { ConfigController } from '../controllers/config.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', ConfigController.get);
router.put('/', ConfigController.update);

module.exports = router;
