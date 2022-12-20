module.exports = {
  local: {
    uri: process.env.DB_URI,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    schema: "public",
    searchPath: "public",
    dialectOptions: {
      prependSearchPath: true,
    },
    dialect: "postgres",
  },
};
