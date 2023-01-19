const { logger } = require('../../logger');

module.exports = {
  development: {
    username: 'courses-api-dbuser',
    password: '123456',
    database: 'courses-api-db',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: msg => logger.info(msg)
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
