const express = require('express');
const route = express.Router();

const userController = require('./controller/userController');
const cuidController = require('./controller/cuidController');

// Rotas de Cadastro/Login do usuario
route.post('/user/register', userController.create);
route.post('/user/authenticate', userController.auth);

// Rotas de Cadastro/Login do cuidador
route.post('/cuid/register', cuidController.create);
route.post('/cuid/authenticate', cuidController.auth);

// Rotas de cadastro do pac
// route.get('/cadastro/pac', );

module.exports = route;
