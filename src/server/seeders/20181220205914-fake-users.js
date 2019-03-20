'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      avatar: '/uploads/avatar1.png',
      username: 'TestUser',
      password: 'password',
      email: 'test1@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      avatar: '/uploads/avatar2.png',
      username: 'TestUser2',
      password: 'password',
      email: 'test2@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }],
    {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};