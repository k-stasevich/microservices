import { sequelize } from '../../../orders/db/models';
import { rmqService } from '../../../orders/services/rabbitmq.service';
import { initServer } from './request';

beforeAll(async () => {
  await initServer();
});

afterAll(async () => {
  await Promise.all([
    //
    rmqService.connection.close(),
    sequelize.close(),
  ]);
});
