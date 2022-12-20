const { DataTypes } = require("sequelize");

module.exports = (sequelize, options) => {
  const Post = sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    options
  );

  return Post;
};
