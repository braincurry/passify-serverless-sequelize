const DB = require("./db/database.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class UserModel {
  constructor() {
    let dbObj = new DB();
    this.user = dbObj.conn.models.user;
  }

  async getUser(email) {
    try {
      let foundUser = await this.user.findOne({
        where: { email: email.toLowerCase() },
      });
      return foundUser;
    } catch (e) {
      throw Error(e);
    }
  }


  async getUserById(id) {
    try {
      let foundUser = await this.user.findOne({
        where: { id },
      });
      return foundUser;
    } catch (e) {
      throw Error(e);
    }
  }

  async createUser(sentUser) {
    try {
      let createdUser = await this.user.create(sentUser);
      return createdUser;
    } catch (e) {
      throw Error(e);
    }
  }

  async updateUser(id, properties) {
    try {
      let updateUser = await this.user.update(properties, {
        where: { id },
        returning: true,
      });
      return updateUser;
    } catch (e) {
      throw Error(e);
    }
  }
}

module.exports = UserModel;
