import { Router } from 'express';
import myUserController from '../controllers/myUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

const router = Router();

router.post('/', jwtCheck, myUserController.createCurrentUSer);
router.put(
  '/',
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  myUserController.updateCurrentUSer,
);

export default router;
