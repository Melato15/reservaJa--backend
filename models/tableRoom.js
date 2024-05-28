"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TableRoom extends Model {}
  TableRoom.init(
    {
      column: DataTypes.NUMBER,
      line: DataTypes.NUMBER,
      objetoAuxiliar: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "TableRoom",
    }
  );
  return TableRoom;
};
