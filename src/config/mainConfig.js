const commonConfig = require("./commonConfig.js");
const database = require("./database.js");

const configData = {
  config: {
    postgres: database["local"],
  },
};

const dataInfo = configData.config;
const finalData = Object.assign({}, dataInfo, commonConfig);
module.exports = finalData;
