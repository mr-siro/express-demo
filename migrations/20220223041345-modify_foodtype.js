"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("FoodTypes", "name", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("FoodTypes", "createdAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.changeColumn("FoodTypes", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.changeColumn("FoodTypes", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn("FoodTypes", "name"),
      queryInterface.removeColumn("FoodTypes", "createdAt"),
      queryInterface.removeColumn("FoodTypes", "updatedAt"),
      queryInterface.removeColumn("FoodTypes", "deletedAt"),
    ]);
  },
};
