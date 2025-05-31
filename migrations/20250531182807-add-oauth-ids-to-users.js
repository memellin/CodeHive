// <timestamp>-add-oauth-ids-to-users.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'googleId', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'githubId', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'githubId');
    await queryInterface.removeColumn('Users', 'googleId');
  }
};