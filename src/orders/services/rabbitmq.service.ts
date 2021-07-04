import { RmqService } from '../../common/services/rabbitmq.service';
import { orderCreatedEvent } from '../message-bus/events';

export const rmqService = new RmqService();

export const connectToRmq = async () => {
  const { SERVICE, RABBITMQ_HOSTNAME } = process.env;
  await rmqService.connect({ hostname: RABBITMQ_HOSTNAME });

  await Promise.all([
    //
    orderCreatedEvent.register(),
  ]);
  console.log(`${SERVICE} connected to RabbitMQ`);
};
