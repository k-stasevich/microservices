import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { Sequelize } from 'sequelize';
import { Order } from './order';

const { DB_CONNECTION_STRING } = process.env;

export const sequelize = new Sequelize(DB_CONNECTION_STRING as string);

const basename = path.basename(__filename);

const _db: any = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = (sequelize as any)['import'](path.join(__dirname, file));
    _db[_.snakeCase(_.lowerCase(model.name))] = model; // lowercase backup
  });

const keys = Object.keys(_db);
keys.forEach((modelName) => {
  _db[_.upperFirst(_.camelCase(modelName))] = _db[modelName];
});
keys.forEach((modelName) => {
  if (_db[modelName].associate) {
    _db[modelName].associate(_db);
  }
});

const db = _db as {
  order: typeof Order;

  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
