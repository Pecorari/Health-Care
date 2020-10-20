const { Model, DataTypes } = require('sequelize');

class Pac extends Model {
  static init(connection) {
    super.init({
      user_id: DataTypes.INTEGER,
      nome: DataTypes.STRING,
      idade: DataTypes.INTEGER,
      sexo: DataTypes.STRING,
      foto: DataTypes.STRING,
      situacao: DataTypes.STRING,
      tratamento: DataTypes.STRING,
      cidade: DataTypes.STRING,
      bairro: DataTypes.STRING,
      endereco: DataTypes.STRING,
    }, {
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'usuario' });
  }
}

module.exports = Pac;
