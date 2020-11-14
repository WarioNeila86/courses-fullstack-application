'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [
      {
        name: 'Demo course 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Demo course 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {});
  }
};
