import '../../../utils/orders/hooks';
import { QUEUE } from '../../../../orders/message-bus/queue';
import { rmqService } from '../../../../orders/services/rabbitmq.service';
import { request } from '../../../utils/orders/request';

describe('orders', () => {
  beforeEach(async () => {
    await rmqService.channel.purgeQueue(QUEUE.ORDER_CREATED);
  });

  describe('POST /orders', () => {
    it('should susccessfully create order', async () => {
      let queueStatus = await rmqService.channel.checkQueue(QUEUE.ORDER_CREATED);
      expect(queueStatus.messageCount).toBe(0);

      const order = { sum: 10 };
      const res = await request().post('/orders').send(order);
      console.log(res.body);

      expect(res.body.success).toBe(true);

      queueStatus = await rmqService.channel.checkQueue(QUEUE.ORDER_CREATED);
      expect(queueStatus.messageCount).toBe(1);
    });
  });
});
