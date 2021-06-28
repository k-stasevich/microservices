import '../../../utils/orders/hooks';
import { request } from '../../../utils/orders/request';

describe('orders', () => {
  describe('POST /orders', () => {
    it('should susccessfully create order', async () => {
      const res = await request().post('/orders');
      expect(res.body.success).toBe(true);
    });
  });
});
