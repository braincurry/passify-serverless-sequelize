const authService = require("../services/authService");
const responseBody = require("../libs/response");
const dbConnect = require("../models/index");
const logger = require("../libs/logger");
const { errCode } = require("../constants/errCode");

module.exports.authHandler = async (event) => {
  let pathParams = event.pathParameters || {};
  try {
    await dbConnect();
    const authObj = new authService();
    const data = JSON.parse(event.body);
    switch (pathParams.method) {
      case "register":
        return await authObj.register(data);

      case "login":
        return await authObj.login(data);

      default:
        return responseBody(400, errCode.SELECT_METHOD);
    }
  } catch (err) {
    logger.error(`error in auth handler : ${pathParams.method}`, err);
    return responseBody(400, errCode.UNIDENTIFIED_ERROR);
  }
};
