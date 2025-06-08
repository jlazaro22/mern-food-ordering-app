import cors from 'cors';
import 'dotenv/config';
import express, { json, Request, Response, urlencoded } from 'express';
import mongooseConnect from './lib/mongoose';

mongooseConnect();

const host = process.env.HOST as string;
const port = Number(process.env.PORT);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/api/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Express server is running!' });
});

app.listen(port, host, () => {
  console.log(`🚀 Server is running on http://${host}:${port}`);
});
