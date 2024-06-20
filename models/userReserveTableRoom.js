"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserReserveTableRoom extends Model {
    static associate(models) {
      UserReserveTableRoom.belongsTo(models.User, { foreignKey: "userId" });
      UserReserveTableRoom.belongsTo(models.Room, { foreignKey: "roomId" });
    }
  }
  UserReserveTableRoom.init(
    {
      roomId: DataTypes.STRING,
      tableRoomId: DataTypes.STRING,
      userId: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserReserveTableRoom",
    }
  );
  return UserReserveTableRoom;
};
