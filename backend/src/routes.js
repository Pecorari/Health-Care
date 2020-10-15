const express = require('express');
const route = express.Router();

const UserController = require('./controller/userController');

// Rotas de Login/Cadastro do usuario
route.post('/user/register', UserController.create);
route.post('/user/authenticate', UserController.auth);

// Rotas de Login/Cadastro do cuidador
// route.get('/cadastro/cuid', );
// route.get('/session/cuid', );

// Rotas de cadastro do pac
// route.get('/cadastro/pac', );

module.exports = route;
