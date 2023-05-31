const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(`-- inside create table: user`);
    try {
      return await queryInterface.createTable("user", {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
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
      console.log(`Error in creating table: user`, err);
    }
  },

  down: async (queryInterface) => {
    console.log(`-- inside down drop table: user`);
    try {
      await queryInterface.dropTable("user");
    } catch (err) {
      console.log(`Error in dropping table: user`, err);
    }
  },
};
