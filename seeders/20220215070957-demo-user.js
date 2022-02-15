module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Linh",
        email: "linhngao@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh1",
        email: "linhngao1@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh2",
        email: "linhngao2@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh3",
        email: "linhngao3@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh4",
        email: "linhngao4@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh5",
        email: "linhngao5@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh6",
        email: "linhngao6@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh7",
        email: "linhngao7@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh8",
        email: "linhngao8@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        name: "Linh9",
        email: "linhngao9@gmail.com",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
