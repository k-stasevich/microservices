export const EVENTS = {
  CREATE_ORDER: 'CREATE_ORDER',
};

export const eventFactory = {
  createOrder: orderId => ({ event: EVENTS.CREATE_ORDER, orderId }),
};
