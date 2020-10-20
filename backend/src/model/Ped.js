const { Model, DataTypes } = require('sequelize');

class Ped extends Model {
  static init(connection) {
    super.init({
      user_id: DataTypes.INTEGER,
      pac_id: DataTypes.INTEGER,
      cuid_id: DataTypes.INTEGER,
      situacao: DataTypes.STRING,
      descricao: DataTypes.INTEGER,
      data_i: DataTypes.STRING,
      data_f: DataTypes.STRING,
      hora_i: DataTypes.STRING,
      hora_f: DataTypes.STRING,
    }, {
      sequelize: connection
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'usuario' });
    this.belongsTo(models.User, { foreignKey: 'pac_id', as: 'paciente' });
    this.belongsTo(models.User, { foreignKey: 'cuid_id', as: 'cuidador' });
  }
}

module.exports = Ped;
