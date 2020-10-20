'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      queryInterface.addColumn(
        'users',
        'pac_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'pacs', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ),
      queryInterface.addColumn(
        'users',
        'ped_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'peds', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ),
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(
      queryInterface.removeColumn('users', 'pac_id'),
      queryInterface.removeColumn('users', 'ped_id')
    );
  }
};
