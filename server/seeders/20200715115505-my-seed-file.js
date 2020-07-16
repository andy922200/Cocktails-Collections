'use strict';
const bcrypt = require("bcryptjs");
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "root",
          email: "root@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: 1,
          isSponsor: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user1",
          email: "user1@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: 1,
          isSponsor: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user2",
          email: "user2@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: 0,
          isSponsor: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const drinkId = [11000,11001,11002,11003,11004,11005,11006,11007,11008,11009,11010,11011,11012,11013,11014,11016,11019,11020,11021,11022]

    return queryInterface.bulkInsert(
      "Favorites",
      Array.from({ length: 20 }).map((d) => ({
        UserId: Math.floor(Math.random() * 3) + 1,
        DrinkId: drinkId[Math.floor(Math.random() * 19)],
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Users", null, {});
    return queryInterface.bulkDelete("Favorites", null, {});
  }
};
