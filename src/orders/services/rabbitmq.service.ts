import { RmqService } from '../../common/services/rabbitmq.service';

export const rmqService = new RmqService();

export const connectToRmq = async () => {
  const { SERVICE, RABBITMQ_HOSTNAME } = process.env;
  await rmqService.connect({ hostname: RABBITMQ_HOSTNAME });
  rmqService.channel.assertQueue('ORDER_CREATE', {
    durable: false,
  });
  console.log(`${SERVICE} connected to RabbitMQ`);
};
