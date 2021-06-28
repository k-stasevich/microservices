import { Router } from 'express';
import { orderController } from './controller';

const router = Router();

router.post('/', orderController.create);

export default router;
