"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FoodType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FoodType.hasMany(models.Food, { foreignKey: "FoodTypeId" });
    }
  }
  FoodType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "FoodType",
      paranoid: true
    }
  );
  return FoodType;
};
