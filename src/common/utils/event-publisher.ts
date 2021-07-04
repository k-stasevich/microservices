import amqplib from 'amqplib';
import { IRmqService } from '../services/rabbitmq.service';

export class EventPublisher {
  private rmqService: IRmqService;

  constructor(options: { rmqService: IRmqService }) {
    this.rmqService = options.rmqService;
  }

  async publish(queue: string, event: unknown, options?: amqplib.Options.Publish) {
    const msg = JSON.stringify(event);
    return this.rmqService.channel.sendToQueue(queue, Buffer.from(msg), options);
  }
}
