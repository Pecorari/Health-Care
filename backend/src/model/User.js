const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(connection) {
    super.init({
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
}

module.exports = User;
