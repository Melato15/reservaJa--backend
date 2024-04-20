"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}

    static async authenticate(email, password) {
      const user = await this.findOne({where: { email } });
      if (!user) {
        return null;
      }
      return user;
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
