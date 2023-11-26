"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            args: true,
            msg: "username is required",
          },
          notNull: {
            args: true,
            msg: "username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            args: true,
            msg: "email is required",
          },
          notNull: {
            args: true,
            msg: "email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            args: true,
            msg: "password is required",
          },
          notNull: {
            args: true,
            msg: "password is required",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            args: true,
            msg: "role is required",
          },
          notNull: {
            args: true,
            msg: "role is required",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
        beforeUpdate: (user) => {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
