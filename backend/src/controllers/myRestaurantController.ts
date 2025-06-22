import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { uploadImage } from '../lib/cloudinary';
import Restaurant from '../models/restaurant';

async function getMyRestaurant(req: Request, res: Response) {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res.status(404).json({ message: 'User restaurant not found' });
      return;
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting restaurant' });
  }
}

async function createMyRestaurant(req: Request, res: Response) {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      res.status(409).json({ message: 'User restaurant already exists' });
      return;
    }

    const image = req.file as Express.Multer.File;
    const imageUrl = await uploadImage(image);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    const savedRestaurant = await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating restaurant' });
  }
}

async function updateMyRestaurant(req: Request, res: Response) {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      res.status(404).json({ message: 'User restaurant not found' });
      return;
    }

    restaurant.name = req.body.name;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const image = req.file as Express.Multer.File;
      const imageUrl = await uploadImage(image);
      restaurant.imageUrl = imageUrl;

      await restaurant.save();
      res.status(200).json(restaurant);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating restaurant' });
  }
}

export default { getMyRestaurant, createMyRestaurant, updateMyRestaurant };
