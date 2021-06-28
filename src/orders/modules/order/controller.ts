import { Request, Response } from 'express';

class OrderController {
  async create(req: Request, res: Response) {
    // TODO
    res.json({ success: true });
  }
}

export const orderController = new OrderController();
