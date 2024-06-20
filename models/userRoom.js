"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRoom extends Model {}
  UserRoom.init(
    {
      roomId: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserRoom",
    }
  );

  UserRoom.associate = (models) => {
    UserRoom.belongsTo(models.Room, { foreignKey: "roomId", as: "Rooms" });
  };

  return UserRoom;
};
