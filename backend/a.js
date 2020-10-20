// create_cuid

//   ped_id: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     references: { model: 'peds', key: 'id' },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   },

// create_ped

//   user_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: { model: 'users', key: 'id' },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   },
//   pac_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: { model: 'pacs', key: 'id' },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   },
//   cuid_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: { model: 'cuids', key: 'id' },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   },
