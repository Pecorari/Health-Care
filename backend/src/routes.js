const express = require('express');
const route = express.Router();

const authUserMiddleware = require('./middleware/authUserMiddleware');
const authCuidMiddleware = require('./middleware/authCuidMiddleware');

const cuidController = require('./controller/cuidController');
const userController = require('./controller/userController');
const pacController = require('./controller/pacController');

// Rotas de Cadastro/Login do cuidador
route.post('/cuid/register', cuidController.create);
route.post('/cuid/complete', authCuidMiddleware, cuidController.complete);
route.post('/cuid/authenticate', cuidController.auth);

// Rota de criação do pedido
// route.get('/', );

// Rotas de Cadastro/Login do usuario
route.post('/user/register', userController.create);
route.post('/user/authenticate', userController.auth);

// Rota de cadastro do pac
route.get('/pac/register', authUserMiddleware, pacController.index);

module.exports = route;
