"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.hasMany(models.Diary, {
        foreignKey: "writerId",
        sourceKey: "uuid",
      });
    }
  }
  Book.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      modelName: "Book",
    }
  );
  return Book;
};
