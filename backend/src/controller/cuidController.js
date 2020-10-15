const Cuid = require('../model/Cuid');
const bcrypt = require('bcryptjs');
const { generateCuidToken } = require('../utils/generateToken');

module.exports = {
  async create(req, res) {
    try {
      if (await Cuid.findOne({ where: { email: req.body.email } })) {
        return res.status(400).send({ error: 'Cuidador already exists' });
      }
      
      const cuid = await Cuid.create(req.body);
  
      cuid.senha = undefined;
  
      return res.send({ cuid, token: generateCuidToken(cuid.id) });
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  },

  async complete(req, res) {
    await Cuid.update(req.body, { where: { id: req.userId } })
      .then(async () => {
        const cuid = await Cuid.findOne({ where: { id: req.userId } })

        cuid.senha = undefined;

        return res.send({ cuid });
      })
      .catch(() => {
        return res.status(400).send({ error: 'Failed to complete registration' });
      });
  },

  async auth(req, res) {
    try {
      const { email, senha } = req.body;

      const cuid = await Cuid.findOne({ where: { email } });

      if(!cuid) {
        return res.status(400).send({ error: 'Cuidador not found' });
      }

      if(!await bcrypt.compare(senha, cuid.senha)) {
        return res.status(400).send({ error: 'Invalid password' });
      }

      cuid.senha = undefined;

      res.send({ cuid, token: generateCuidToken(cuid.id) });
    } catch (err) {
      return res.status(400).send({ error: 'Authentication failed' });
    }
  },
}
