"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Food", "type"),

      queryInterface.addColumn("Food", "FoodTypeId", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.addColumn("Food", "type", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.removeColumn("Food", "FoodTypeId"),
    ]);
  },
};
