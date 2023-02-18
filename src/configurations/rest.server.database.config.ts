import { Sequelize } from "sequelize";
import loggerHelper from '../helpers/logger.helper';

const {
  DB_DOMAIN,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD
} = process.env;

const database = new Sequelize(DB_DATABASE || 'database', DB_USER || 'user', DB_PASSWORD || 'password', {
  host: DB_DOMAIN,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: msg => loggerHelper.debug(msg),
});

export default database;