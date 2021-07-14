/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  port: process.env.DB_PORT,
  logging: process.env.DB_LOGGING === 'true',
  benchmark: process.env.DB_BENCHMARK === 'true',
};

module.exports = {
  development: config,
  production: config,
};
