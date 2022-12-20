const DB = require("./db/database.js");

class UserModel {
  constructor() {
    let dbObj = new DB();
    console.log(dbObj.conn.models);
    this.post = dbObj.conn.models.post;
  }

  async getPosts() {
    try {
      const posts = await this.post.findAll();
      return posts;
    } catch (e) {
      throw Error(e);
    }
  }

  async createPosts(data) {
    try {
      const posts = await this.post.create(data);
      return posts;
    } catch (e) {
      throw Error(e);
    }
  }
}

module.exports = UserModel;
