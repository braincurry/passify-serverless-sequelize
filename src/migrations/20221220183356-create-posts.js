const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(`-- inside create table: post`);
    try {
      return await queryInterface.createTable("post", {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("NOW()"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("NOW()"),
        },
      });
    } catch (e) {
      console.log(`Error in creating table: post`, err);
    }
  },

  down: async (queryInterface) => {
    console.log(`-- inside down drop table: post`);
    try {
      await queryInterface.dropTable("post");
    } catch (err) {
      console.log(`Error in dropping table: post`, err);
    }
  },
};
