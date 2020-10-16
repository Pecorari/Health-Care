const Cuid = require('../model/Cuid');
const bcrypt = require('bcryptjs');
const { generateCuidToken } = require('../utils/generateToken');
const meiler = require('../modules/mailer');
const crypto = require('crypto');

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

  async recSenha(req, res) {
    try {
      const { email } = req.body;

      const cuid = await Cuid.findOne({ where: { email } });

      if(!cuid) {
        return res.status(400).send({ error: 'Cuid not found' });
      }

      const token = crypto.randomBytes(4).toString('base64').replace(/[^A-Za-z0-9]/g, "");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await Cuid.update({
        password_reset_token: token,
        password_reset_expires: now,
      }, { where: { email }});

      meiler.sendMail({
        to: email,
        from: 'healthcare1820@gmail.com',
        template: 'auth/forgot_password',
        context: { token }
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
      const { email, token, senha } = req.body;

      const cuid = await Cuid.findOne({ where: { email } });

      if(!cuid) {
        return res.status(400).send({ error: 'cuid not found' });
      }

      if(token !== cuid.password_reset_token) {
        return res.status(400).send({ error: 'Token invalid' });
      }

      const now = new Date();

      if(now > cuid.password_reset_expires) {
        return res.status(400).send({ error: 'Token expired, generate a new one' });
      }

      const hash = await bcrypt.hash(senha, 10);
      cuid.senha = hash

      await cuid.save();

      return res.send();
    } catch (err) {
      res.status(400).send({ error: 'Cannot reset password, try again!' })
    }
  }
}
