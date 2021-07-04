import { DataTypes } from 'sequelize/types';

export const UUID = {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
};
