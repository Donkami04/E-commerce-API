'use strict';
const CUSTOMER_TABLE = require('../models/customer.model')
module.exports = {
  up: async (queryInterface, Sequelize) => {
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'userId')

  }
};
