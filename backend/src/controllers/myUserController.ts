import { Request, Response } from 'express';
import User from '../models/user';

async function createCurrentUSer(req: Request, res: Response) {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user' });
  }
}

async function updateCurrentUSer(req: Request, res: Response) {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating user' });
  }
}

export default {
  createCurrentUSer,
  updateCurrentUSer,
};
