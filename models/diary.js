"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Diary.belongsTo(models.Book, {
        foreignKey: "writerId",
        targetKey: "uuid",
      });
    }
  }
  Diary.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: DataTypes.STRING,
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isTop: DataTypes.BOOLEAN,
      writerId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      sequelize,
      modelName: "Diary",
    }
  );
  return Diary;
};
