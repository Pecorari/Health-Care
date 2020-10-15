const Cuid = require('../model/Cuid');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = {
  async create(req, res) {
    try {
      if (await Cuid.findOne({ where: { email: req.body.email } })) {
        return res.status(400).send({ error: 'Cuidador already exists' });
      }
      
      const cuid = await Cuid.create(req.body);
  
      cuid.senha = undefined;
  
      return res.send({ cuid, token: generateToken(cuid.id) });
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' });
    }
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

      res.send({ cuid, token: generateToken(cuid.id) });
    } catch (err) {
      return res.status(400).send({ error: 'Authentication failed' });
    }
  },
}
