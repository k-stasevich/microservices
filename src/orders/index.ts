import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });
import { registerRoutes } from './routes';
import { connectToRmq } from './services/rabbitmq.service';

const { PORT, SERVICE } = process.env;

const app = express();
registerRoutes(app);

Promise.all([
  //
  connectToRmq(),
]).then(() => {
  app.listen(PORT, () => {
    console.log(`${SERVICE} listening at http://localhost:${PORT}`);
  });
});
