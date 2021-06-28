import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });
import { registerRoutes } from './routes';
import { connectToRmq } from './services/rabbitmq.service';

const app = express();
registerRoutes(app);

export default async (): Promise<express.Express> => {
  await connectToRmq();
  return app;
};
