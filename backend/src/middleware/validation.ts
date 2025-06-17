import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const validateMyUserRequest = [
  body('name').isString().notEmpty().withMessage('Name must be a string'),
  body('addressLine1')
    .isString()
    .notEmpty()
    .withMessage('Address line 1 must be a string'),
  body('city').isString().notEmpty().withMessage('City must be a string'),
  body('country').isString().notEmpty().withMessage('Country must be a string'),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('city')
    .isString()
    .withMessage('City must be a string')
    .notEmpty()
    .withMessage('City is required'),
  body('country')
    .isString()
    .withMessage('Country must be a string')
    .notEmpty()
    .withMessage('Country is required'),
  body('deliveryPrice')
    .isFloat({ min: 0 })
    .withMessage('Delivery price must be a positive number'),
  body('estimatedDeliveryTime')
    .isInt({ min: 0 })
    .withMessage('Estimated delivery time must be a positive number'),
  body('cuisines')
    .isArray()
    .withMessage('Cuisines must be an array')
    .not()
    .isEmpty()
    .withMessage('Cuisines array can not be empty'),
  body('menuItems').isArray().withMessage('Menu items must be an array'),
  body('menuItems.*.name')
    .isString()
    .withMessage('Menu item name must be a string')
    .notEmpty()
    .withMessage('Menu item name is required'),
  body('menuItems.*.price')
    .isFloat({ min: 0 })
    .withMessage('Menu item price must be a positive number'),
  handleValidationErrors,
];
