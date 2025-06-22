import cors from 'cors';
import 'dotenv/config';
import express, { json, Request, Response, urlencoded } from 'express';
import cloudinaryConfig from './lib/cloudinary';
import mongooseConnect from './lib/mongoose';
import myRestaurantRoutes from './routes/myRestaurantRoutes';
import myUserRoutes from './routes/myUserRoutes';
import restaurantRoutes from './routes/restaurantRoutes';

mongooseConnect();
cloudinaryConfig();

const host = process.env.HOST as string;
const port = Number(process.env.PORT);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Health OK!' });
});

app.use('/api/my/user', myUserRoutes);
app.use('/api/my/restaurant', myRestaurantRoutes);
app.use('/api/restaurant', restaurantRoutes);

app.listen(port, host, () => {
  console.log(`🚀 Server is running on http://${host}:${port}`);
});
