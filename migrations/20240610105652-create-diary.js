"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Diaries", {
      id: {
        type: Sequelize.NUMBER,
      },
      date: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      isTop: {
        type: Sequelize.BOOLEAN,
      },
      // diaries_ibfk_1: {
      //   type: Sequelize.UUID,
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Diaries");
  },
};
