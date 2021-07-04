import { Model, DataTypes, Optional } from 'sequelize';
import { UUID } from '../../../common/utils/types';
import { IModel } from '../../types/db';
import { sequelize } from './index';

// These are all the attributes in the Order model
interface OrderAttributes {
  id: number;
  sum: number;
}

// Some attributes are optional in `Order.build` and `Order.create` calls
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface Order extends Model<OrderAttributes, OrderCreationAttributes>, IModel {}

export const Order = sequelize.define<Order>(
  'Order',
  {
    id: {
      ...UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    sum: {
      type: new DataTypes.DECIMAL(),
      allowNull: false,
    },
  },
  {
    tableName: 'orders',
  }
);
