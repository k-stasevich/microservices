import { sequelize } from './models';

export const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
