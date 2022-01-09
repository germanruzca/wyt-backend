module.exports = (() => ({
  service: {
    host: "http://localhost",
    port: 3001,
    actionSecret: process.env.WYT_ACTION_SECRET,
    refreshSecret: process.env.WYT_REFRESH_SECRET,
  },
  database: {
    host: process.env.WYT_PSQL_HOST,
    username: process.env.WYT_PSQL_USER,
    password: process.env.WYT_PSQL_PASSWORD,
    name: process.env.WYT_PSQL_DB,
  },
  sequelizeOptions: {
    host: process.env.WYT_PSQL_HOST,
    port: parseInt(process.env.WYT_PSQL_LISTEN_PORT),
    dialect: "postgres",
    logging: false,
  },
}))();
