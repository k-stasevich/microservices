import axios from 'axios';

export const kitchenAPI = {
  async cook(orderId: number) {
    const url = `${process.env.KITCHEN_URL}/cook`;
    return axios.post(url, { orderId });
  },
};
