import { BaseAPI } from './base.api';

import Axios from 'axios';

export class DeliveryAPI extends BaseAPI {
  public async deliver(orderId: number) {
    const url = `${this.baseUrl}/deliver`;
    return Axios.post(url, { orderId });
  }
}
