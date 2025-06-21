import { Router } from 'express';
import myRestaurantController from '../controllers/myRestaurantController';
import { multerUpload } from '../lib/multer';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = Router();

router.get('/', jwtCheck, jwtParse, myRestaurantController.getMyRestaurant);

router.post(
  '/',
  multerUpload.single('imageFile'),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.createMyRestaurant,
);

export default router;
