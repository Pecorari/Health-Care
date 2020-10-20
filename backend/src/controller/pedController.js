const Cuid = require('../model/Cuid');
const User = require('../model/User');
const Pac = require('../model/Pac');
const Ped = require('../model/Ped');

module.exports = {
  async index(req, res) {
    const user_id = req.userId;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const ped = await Ped.findAll({ where: { user_id } });

    return res.json(ped);
  },

  async create(req, res) {
    const user_id = req.userId;
    const { pac_id, cuid_id } = req.params;
    const { situacao, descricao, data_i, data_f, hora_i, hora_f } = req.body;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const pac = await Pac.findByPk(pac_id);
    if(!pac) {
      return res.status(400).send({ error: 'Pac not found' });
    }

    const cuid = await Cuid.findByPk(cuid_id);
    if(!cuid) {
      return res.status(400).send({ error: 'Cuid not found' });
    }

    const ped = await Ped.create({
      user_id,
      pac_id,
      cuid_id,
      situacao,
      descricao,
      data_i,
      data_f,
      hora_i,
      hora_f
    });

    return res.json(ped);
  }
};
