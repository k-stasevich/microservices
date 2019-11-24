const EVENTS = {
  CREATE_ORDER: 'CREATE_ORDER',
};

module.exports.EVENTS = EVENTS;

module.exports.createCreateOrder = orderId => {
  return { event: EVENTS.CREATE_ORDER, orderId };
};
