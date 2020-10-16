const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Cuid extends Model {
  static init(connection) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      password_reset_token: DataTypes.STRING,
      password_reset_expires: DataTypes.DATE,
      ocupacao: DataTypes.STRING,
      diploma: DataTypes.STRING,
      cpf: DataTypes.STRING,
      sexo: DataTypes.STRING,
      idade: DataTypes.INTEGER,
      celular: DataTypes.STRING,
      endereco: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
    }, {
      hooks: {
        beforeCreate: async (cuid) => {
          const hash = await bcrypt.hash(cuid.senha, 10);
          cuid.senha = hash;
          cuid.email = cuid.email.toLowerCase();
        }
      },
      sequelize: connection
    })
  }
}

module.exports = Cuid;
