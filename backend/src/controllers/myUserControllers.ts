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

export default {
  createCurrentUSer,
};
