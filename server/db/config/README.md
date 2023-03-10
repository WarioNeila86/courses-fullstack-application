# Sequelize config file

There can be different environments and for each we need to specify:

- DB username
- DB password
- DB to use
- Host address
- Dialect (eg. postgres, mysql, etc)

The keys of the objects (e.g. "development") are used on model/index.js for matching `process.env.NODE_ENV` (When undefined, "development" is a default value).

Sequelize will use the default connection port for each dialect (for example, for postgres, it is port 5432). If you need to specify a different port, use the "port" field (it is not present by default in config/config.js but you can simply add it).

Note: If your database doesn't exist yet, you can just call `db:create` command. With proper access it will create that database for you.

More info in [Sequelize documentation](https://sequelize.org/master/manual/migrations.html#configuration).
