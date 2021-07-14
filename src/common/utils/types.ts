import { DataTypes } from 'sequelize';

export const UUID = {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
};
