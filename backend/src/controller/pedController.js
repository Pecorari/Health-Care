const Cuid = require('../model/Cuid');
const User = require('../model/User');
const Pac = require('../model/Pac');
const Ped = require('../model/Ped');
const { update } = require('./pacController');

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

    await User.update({ped_id: ped.id}, {where: {id: user_id}});
    await Cuid.update({ped_id: ped.id}, {where: {id: cuid_id}});

    return res.json(ped);
  },

  async update(req, res) {
    const user_id = req.userId;
    const { id } = req.params;
    const { situacao, descricao, data_i, data_f, hora_i, hora_f } = req.body;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const ped = await Ped.update({
      situacao,
      descricao,
      data_i,
      data_f,
      hora_i,
      hora_f,
    }, { where: { id } });

    return res.json(ped);
  },

  async delete(req, res) {
    const user_id = req.userId;
    const { id } = req.params;

    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const ped = await Ped.destroy({ where: { id } });

    return res.json(ped);
  }
};
