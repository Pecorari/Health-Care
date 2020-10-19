const Pac = require('../model/Pac');
const User = require('../model/User');

module.exports = {
  async create(req, res) {
    const { user_id } = req.params;
    const { nome, idade, sexo, foto, situacao, tratamento, cidade, bairro, endereco } = req.body;

    const user = await User.findByPk(user_id);

    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const pac = await Pac.create({
      nome,
      idade,
      sexo,
      foto,
      situacao,
      tratamento,
      cidade,
      bairro,
      endereco,
      user_id
    });

    return res.json(pac);
  }
};
