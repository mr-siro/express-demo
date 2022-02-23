"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Food", "name", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Food", "description", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Food", "type", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn("Food", "createdAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.changeColumn("Food", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn("Food", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn("Food", "name"),
      queryInterface.removeColumn("Food", "description"),
      queryInterface.removeColumn("Food", "type"),
      queryInterface.removeColumn("Food", "createdAt"),
      queryInterface.removeColumn("Food", "updatedAt"),
      queryInterface.removeColumn("Food", "deletedAt"),
    ]);
  },
};
