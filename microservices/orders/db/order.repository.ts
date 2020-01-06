import { ORDER_STATUS } from '../constants/order-status.constants';
import { getDB } from '../../db-connect';

interface IOrder {
  id: number;
  status: ORDER_STATUS;
}

class OrderRepository {
  // public async find(): Promise<IOrder[]> {
  public async find(): Promise<any> {
    return this.getEntity().find({});
  }

  public async createOrder(id: number, status: ORDER_STATUS): Promise<IOrder> {
    const order: IOrder = {
      id,
      status,
    };

    const {
      ops: [created],
    } = await this.getEntity().insertOne(order);

    return created;
  }

  public async updateOrder(id: number, status: ORDER_STATUS): Promise<void> {
    await this.getEntity().updateOne({ id }, { $set: { status } }, { upsert: false });
    return;
  }

  private getEntity() {
    return getDB().collection('orders');
  }
}

export const orderRepository = new OrderRepository();
