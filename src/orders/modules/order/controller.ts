import { NextFunction, Request, Response } from 'express';
import { Transaction } from 'sequelize';
import { sequelize } from '../../db/models';
import { Order } from '../../db/models/order';
import { eventPublisher } from '../../message-bus/event-publisher';
import { IOrderNew } from '../../types/order';

class OrderController {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  async create(req: Request<any, any, { sum: number }>, res: Response, next: NextFunction) {
    const { sum } = req.body;

    const order: IOrderNew = {
      sum,
    };

    let transaction!: Transaction;
    try {
      transaction = await sequelize.transaction();

      const createdOrder = await Order.create(order, { transaction, raw: true });

      // @ts-ignore
      console.log('createdOrder', createdOrder.id);

      await transaction.commit();
      // @ts-ignore
      await eventPublisher.orderCreated(createdOrder.id);
      res.json(createdOrder);
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }
}

export const orderController = new OrderController();
