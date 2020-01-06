import { getDB } from '../../db-connect';

interface IKitchenOrder {
  id: number;
}

class KitchenOrderRepository {
  public async find(): Promise<any> {
    return this.getEntity().find({});
  }

  public async createKitchenOrder(id: number): Promise<IKitchenOrder> {
    const order: IKitchenOrder = {
      id,
    };

    const {
      ops: [created],
    } = await this.getEntity().insertOne(order);

    return created;
  }

  private getEntity() {
    return getDB().collection('orders');
  }
}

export const kitchenOrderRepository = new KitchenOrderRepository();
