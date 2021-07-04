import { rmqService } from '../../services/rabbitmq.service';
import { Event } from '../../../common/utils/event';
import { EventRegistrator } from '../../../common/utils/event-registrator';

interface IOrderCreatedOptions {
  id: string;
}

export interface IOrderCreatedEvent {
  id: string;
}

class OrderCreatedEvent implements Event<IOrderCreatedOptions, IOrderCreatedEvent> {
  create(options: IOrderCreatedOptions): IOrderCreatedEvent {
    return {
      id: options.id,
    };
  }

  async register() {
    await rmqService.channel.assertQueue('ORDER_CREATED', { durable: true });
  }
}

export const orderCreatedEvent = new EventRegistrator<IOrderCreatedOptions, IOrderCreatedEvent>(
  new OrderCreatedEvent()
);
