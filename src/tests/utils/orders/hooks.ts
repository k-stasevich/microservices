import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'orders', '.env') });
import path from 'path';
import { rmqService } from '../../../orders/services/rabbitmq.service';
import { initServer } from './request';

beforeAll(async () => {
  await initServer();
});

afterAll(async () => {
  await rmqService.connection.close();
});
