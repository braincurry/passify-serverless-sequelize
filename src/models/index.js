const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const config = require("../config/mainConfig.js");

const DB = require("./db/database.js");

let options = {
  underscored: true,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  freezeTableName: true,
};

const dbConnect = () => {
  console.log(`-- inside dbConnect..`);
  return new Promise((resolve, reject) => {
    const sequelize = new Sequelize(
      config.postgres.database,
      config.postgres.username,
      config.postgres.password,
      {
        host: config.postgres.host,
        schema: config.postgres.schema,
        dialect: config.postgres.dialect,
        port: config.postgres.port,
      }
    );

    const modelDefiners = [];
    fs.readdirSync(path.join(__dirname, "./schemas")).forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, `./schemas/${file}`)));
    });

    for (const definer of modelDefiners) {
      definer(sequelize, options);
    }

    Object.keys(sequelize.models).forEach((modelName) => {
      if (sequelize.models[modelName].associate) {
        sequelize.models[modelName].associate(sequelize.models);
      }
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log("connected to db.");
        let db = new DB(sequelize);
        resolve(sequelize);
      })
      .catch((err) => {
        console.log("db connection error:", err);
        reject();
      });
  });
};

module.exports = dbConnect;
