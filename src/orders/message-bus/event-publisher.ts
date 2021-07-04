import { IOrderCreatedEvent } from './events';
import { QUEUE } from './queue';
import { EventPublisher as Publisher } from '../../common/utils/event-publisher';
import { rmqService } from '../services/rabbitmq.service';

export const publisher = new Publisher({ rmqService: rmqService });

class EventPublisher {
  orderCreated(event: IOrderCreatedEvent) {
    publisher.publish(QUEUE.ORDER_CREATED, event);
  }
}

export const eventPublisher = new EventPublisher();
