class DB {
  constructor(sequelize) {
    if (DB.exists) {
      console.log(`returning existing DB.instance`);
      return DB.instance;
    }
    console.log(`setting DB.instance`);
    this.conn = sequelize;
    DB.instance = this;
    DB.exists = true;
    return this;
  }
}

module.exports = DB;
