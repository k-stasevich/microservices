import { QUEUE } from '../../../../orders/message-bus/queue';
import { rmqService } from '../../../../orders/services/rabbitmq.service';
import '../../../utils/orders/hooks';
import { request } from '../../../utils/orders/request';

describe('orders', () => {
  beforeEach(async () => {
    await rmqService.channel.purgeQueue(QUEUE.ORDER_CREATED);
  });

  describe('POST /orders', () => {
    it('should susccessfully create order', async () => {
      let queueStatus = await rmqService.channel.checkQueue(QUEUE.ORDER_CREATED);
      expect(queueStatus.messageCount).toBe(0);

      const res = await request().post('/orders');
      expect(res.body.success).toBe(true);

      queueStatus = await rmqService.channel.checkQueue(QUEUE.ORDER_CREATED);
      expect(queueStatus.messageCount).toBe(1);
    });
  });
});
