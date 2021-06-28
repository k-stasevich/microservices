import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectToRmq } from './services/rabbitmq.service';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const { PORT, SERVICE } = process.env;

Promise.all([
  //
  connectToRmq(),
]).then(() => {
  app.listen(PORT, () => {
    console.log(`${SERVICE} listening at http://localhost:${PORT}`);
  });
});
