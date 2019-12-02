import { ICreateOrderEvent, ICookRollbackEvent } from './events';

export interface IEvent {
  event: string;
}

export const EVENTS = {
  CREATE_ORDER: 'CREATE_ORDER',
  COOK_ROLLBACK: 'COOK_ROLLBACK',
};

export interface ICreateOrderEvent extends IEvent {
  orderId: number;
}
export interface ICookRollbackEvent extends IEvent {
  orderId: number;
}

export const eventFactory = {
  createOrder: (orderId): ICreateOrderEvent => ({
    event: EVENTS.CREATE_ORDER,
    orderId,
  }),
  cookRollback: (orderId): ICookRollbackEvent => ({
    event: EVENTS.COOK_ROLLBACK,
    orderId,
  }),
};
