import { RmqService } from '../../common/services/rabbitmq.service';

const { SERVICE, RABBITMQ_HOSTNAME } = process.env;

export const rmqService = new RmqService();

export const connectToRmq = async () => {
  await rmqService.connect({ hostname: RABBITMQ_HOSTNAME });
  rmqService.channel.assertQueue('ORDER_CREATE', {
    durable: false,
  });
  console.log(`${SERVICE} connected to RabbitMQ`);
};
