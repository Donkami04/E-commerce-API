'use strict';
const CUSTOMER_TABLE = require('')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn(CUSTOMER_TABLE, 'userId')
  },

  down: async (queryInterface, Sequelize) => {

  }
};
