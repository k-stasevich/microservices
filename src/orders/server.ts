import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });
import 'express-async-errors';
import { registerRoutes } from './routes';
import { connectToRmq } from './services/rabbitmq.service';
import { connectToDb } from './db';
import { errorHandler } from '../common/utils/error-handler';

const app = express();
app.use(express.json({ limit: process.env.MAX_JSON_SIZE })); // json body decoding
registerRoutes(app);
app.use(errorHandler);

export default async (): Promise<express.Express> => {
  await Promise.all([
    //
    connectToDb(),
    connectToRmq(),
  ]);
  return app;
};
