import { OrderAttributes } from '../db/models/order';

export type IOrderNew = Omit<OrderAttributes, 'id'>;
