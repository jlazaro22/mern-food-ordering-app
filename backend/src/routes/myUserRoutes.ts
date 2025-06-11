import { Router } from 'express';
import myUserControllers from '../controllers/myUserControllers';
import { jwtCheck } from '../middleware/auth';

const router = Router();

router.post('/', jwtCheck, myUserControllers.createCurrentUSer);

export default router;
