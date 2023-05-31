module.exports = {
  local: {
    uri: process.env.DB_URI,
    username: "postgres",
    host: process.env.DB_HOST,
    database: "demo",
    password: "6363",
    port: process.env.DB_PORT,
    schema: "public",
    searchPath: "public",
    dialectOptions: {
      prependSearchPath: true,
    },
    dialect: "postgres",
  },
};
