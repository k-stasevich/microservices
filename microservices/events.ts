export interface IEvent {
  event: string;
}

export const EVENTS = {
  CREATE_ORDER: 'CREATE_ORDER',
  COOK_SUCCESS: 'COOK_SUCCESS',
  COOK_ERROR: 'COOK_ERROR',
  COOK_ROLLBACK: 'COOK_ROLLBACK',
};

export interface ICreateOrderEvent extends IEvent {
  orderId: number;
}
export interface ICookSuccessEvent extends IEvent {
  orderId: number;
}
export interface ICookErrorEvent extends IEvent {
  orderId: number;
}
export interface ICookRollbackEvent extends IEvent {
  orderId: number;
}

export const eventFactory = {
  createOrder: (orderId: number): ICreateOrderEvent => ({
    event: EVENTS.CREATE_ORDER,
    orderId,
  }),
  cookSuccess: (orderId: number): ICookSuccessEvent => ({
    event: EVENTS.COOK_SUCCESS,
    orderId,
  }),
  cookError: (orderId: number): ICookErrorEvent => ({
    event: EVENTS.COOK_ERROR,
    orderId,
  }),
  cookRollback: (orderId): ICookRollbackEvent => ({
    event: EVENTS.COOK_ROLLBACK,
    orderId,
  }),
};
