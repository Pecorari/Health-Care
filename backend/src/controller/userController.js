const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { generateUserToken } = require('../utils/generateToken');
const meiler = require('../modules/mailer');
const { use } = require('../modules/mailer');

module.exports = {
  async create(req, res) {
    try {
      if (await User.findOne({ where: { email: req.body.email } })) {
        return res.status(400).send({ error: 'User already exists' });
      }
      
      const user = await User.create(req.body);
  
      user.senha = undefined;
  
      return res.send({ user, token: generateUserToken(user.id) });
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

      res.send({ user, token: generateUserToken(user.id) });
    } catch (err) {
      return res.status(400).send({ error: 'Authentication failed' });
    }
  },

  async recSenha(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if(!user) {
        return res.status(400).send({ error: 'User not found' });
      }

      meiler.sendMail({
        to: email,
        from: 'healthcare1820@gmail.com',
        template: 'auth/forgot_password',
      }, (err) => {
        if(err) {
          return res.status(400).send({ error: 'Cannot send forgot password email' })
        }
        
        return res.send();
      })
    } catch (err) {
      res.status(400).send({ error: 'Error on forgot password, try again!' })
    }
  },

  async resSenha(req, res) {
    try {
      const { email, senha } = req.body;
      
      const user = await User.findOne({ where: { email } });

      if(!user) {
        return res.status(400).send({ error: 'User not found' });
      }

      if(senha === user.senha) {
        return res.status(400).send({ error: 'The new password, Must be different of the current' });
      }

      const hash = await bcrypt.hash(senha, 10);
      user.senha = hash

      await user.save();

      return res.send();
    } catch (err) {
      res.status(400).send({ error: 'Cannot reset password, try again!' })
    }
  }
}
