import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import 'express-async-errors';
import { connectToRmq } from './services/rabbitmq.service';
import { errorHandler } from '../common/utils/error-handler';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(express.json({ limit: process.env.MAX_JSON_SIZE })); // json body decoding
app.use(errorHandler);
const { PORT, SERVICE } = process.env;

Promise.all([
  //
  connectToRmq(),
]).then(() => {
  app.listen(PORT, () => {
    console.log(`${SERVICE} listening at http://localhost:${PORT}`);
  });
});
