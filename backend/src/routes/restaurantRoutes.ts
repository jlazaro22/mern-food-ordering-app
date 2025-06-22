import { Router } from 'express';
import restaurantController from '../controllers/restaurantController';
import { validateSearchRestaurantRequest } from '../middleware/validation';

const router = Router();

router.get(
  '/search/:city',
  validateSearchRestaurantRequest,
  restaurantController.searchRestaurants,
);

export default router;
