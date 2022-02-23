module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("FoodTypes", [
      {
        name: "Lương thực",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Thực phẩm",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Gia vị",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("FoodTypes", null, {});
  },
};
