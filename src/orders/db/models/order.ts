import { Model, DataTypes, Optional } from 'sequelize';
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
interface Order extends Model<OrderAttributes, OrderCreationAttributes> {
  //   id!: number; // Note that the `null assertion` `!` is required in strict mode.
  //   sum!: number;
}

export const Order = sequelize.define<Order>(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
