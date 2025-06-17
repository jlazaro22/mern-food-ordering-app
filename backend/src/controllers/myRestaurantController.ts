import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { uploadImage } from '../lib/cloudinary';
import Restaurant from '../models/restaurant';

async function createMyRestaurant(req: Request, res: Response) {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      res.status(409).json({ message: 'User restaurant already exists' });
      return;
    }

    const image = req.file as Express.Multer.File;
    const uploadResponse = await uploadImage(image);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    const savedRestaurant = await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating restaurant' });
  }
}

export default { createMyRestaurant };
