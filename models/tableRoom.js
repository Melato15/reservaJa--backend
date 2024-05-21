"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TableRoom extends Model {}
  TableRoom.init(
    {
      column: DataTypes.NUMBER,
      line: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "TableRoom",
    }
  );
  return TableRoom;
};
