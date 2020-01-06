import { BaseAPI } from './base.api';

import Axios from 'axios';

export class KitchenAPI extends BaseAPI {
  public async cook(orderId: number) {
    const url = `${this.baseUrl}/cook`;
    return Axios.post(url, { orderId });
  }
}
