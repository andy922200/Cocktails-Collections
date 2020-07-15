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

    return queryInterface.bulkInsert(
      "Favorites",
      Array.from({ length: 20 }).map((d) => ({
        UserId: Math.floor(Math.random() * 3) + 1,
        DrinkId: Math.floor(Math.random() * 20000) + 1,
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
