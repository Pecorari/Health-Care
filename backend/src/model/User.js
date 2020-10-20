const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(connection) {
    super.init({
      pac_id: DataTypes.INTEGER,
      ped_id: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      password_reset_token: DataTypes.STRING,
      password_reset_expires: DataTypes.DATE,
    }, {
      hooks: {
        beforeCreate: async (user) => {
          const hash = await bcrypt.hash(user.senha, 10);
          user.senha = hash;
          user.email = user.email.toLowerCase();
        }
      },
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'pac_id', as: 'paciente' });
    this.belongsToMany(models.User, { foreignKey: 'ped_id', as: 'pedido' });
  }
}

module.exports = User;
