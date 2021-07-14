import { Router } from 'express';
import { orderController } from './controller';

const router = Router();

// TODO: add schema
router.post('/', orderController.create);

export default router;
