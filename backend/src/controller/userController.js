const User = require('../model/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = {
  async create(req, res) {
    try {
      if (await User.findOne({ where: { email: req.body.email } })) {
        return res.status(400).send({ error: 'User already exists' });
      }
      
      const user = await User.create(req.body);
  
      user.senha = undefined;
  
      return res.send({ user, token: generateToken(user.id) });
    } catch (err) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  },

  async auth(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ where: { email } });

      if(!user) {
        return res.status(400).send({ error: 'User not found' });
      }

      if(!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).send({ error: 'Invalid password' });
      }

      user.senha = undefined;

      res.send({ user, token: generateToken(user.id) });
    } catch (err) {
      return res.status(400).send({ error: 'Authentication failed' });
    }
  }
}
