import { Request, Response } from 'express';
import { eventPublisher } from '../../message-bus/event-publisher';
import { IOrder } from '../../types/order';

class OrderController {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async create(req: Request<any, any, any, { id: string }>, res: Response) {
    const { id } = req.query;
    const order: IOrder = {
      id,
    };

    // TODO: save it to DB

    await eventPublisher.orderCreated(order);
    res.json({ success: true });
  }
}

export const orderController = new OrderController();
