import { eventFactory, ICookRollbackEvent } from '../../events';
import { IMSTransaction } from '../../IMSTransaction';
import { kitchenAPI } from '../api/kitchen.api';

export class CookTransaction implements IMSTransaction<ICookRollbackEvent> {
  constructor(private orderId: number) {}

  commit() {
    return kitchenAPI.cook(this.orderId);
  }

  rollback() {
    return eventFactory.cookRollback(this.orderId);
  }
}
