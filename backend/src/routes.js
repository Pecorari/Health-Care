const express = require('express');
const route = express.Router();

const authUserMiddleware = require('./middleware/authUserMiddleware');
const authCuidMiddleware = require('./middleware/authCuidMiddleware');

const cuidController = require('./controller/cuidController');
const userController = require('./controller/userController');
const pacController = require('./controller/pacController');

// Parte do CUID

// Rotas de Cadastro/Login do cuidador
route.post('/cuid/register', cuidController.create);
route.post('/cuid/complete', authCuidMiddleware, cuidController.complete);
route.post('/cuid/authenticate', cuidController.auth);
route.post('/cuid/forgot_password', cuidController.recSenha);
route.post('/cuid/reset_password', cuidController.resSenha);

// Parte do USER

// Rotas de Cadastro/Login do usuario
route.post('/user/register', userController.create);
route.post('/user/authenticate', userController.auth);
route.post('/user/forgot_password', userController.recSenha);
route.post('/user/reset_password', userController.resSenha);

// Rota de cadastro do pac
route.post('/user/:user_id/pac/register', authUserMiddleware, pacController.create);

module.exports = route;
