const Pac = require('../model/Pac');
const User = require('../model/User');

module.exports = {
  async index(req, res) {
    const user_id = req.userId;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const pac = await Pac.findAll({ where: { user_id } });

    return res.json(pac);
  },

  async create(req, res) {
    const user_id = req.userId;
    const { nome, idade, sexo, foto, situacao, tratamento, cidade, bairro, endereco } = req.body;

    const user = await User.findByPk(user_id);

    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const pac = await Pac.create({
      user_id,
      nome,
      idade,
      sexo,
      foto,
      situacao,
      tratamento,
      cidade,
      bairro,
      endereco
    });

    await User.update({pac_id: pac.id}, {where: {id: user_id}});

    return res.json(pac);
  },

  async update(req, res) {
    const user_id = req.userId;
    const { id } = req.params;
    const { nome, idade, sexo, foto, situacao, tratamento, cidade, bairro, endereco } = req.body;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const pac = await Pac.update({
      nome,
      idade,
      sexo,
      foto,
      situacao,
      tratamento,
      cidade,
      bairro,
      endereco,
    }, { where: { id } });

    return res.json(pac);
  },

  async delete(req, res) {
    const user_id = req.userId;
    const { id } = req.params;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const pac = await Pac.destroy({ where: { id } });

    return res.json(pac);
  },
};
