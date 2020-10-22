const express = require('express');
const route = express.Router();

const authUserMiddleware = require('./middleware/authUserMiddleware');
const authCuidMiddleware = require('./middleware/authCuidMiddleware');

const cuidController = require('./controller/cuidController');
const userController = require('./controller/userController');
const pacController = require('./controller/pacController');
const pedController = require('./controller/pedController');

// Parte do CUID

// Rotas de Cadastro/Login dos cuidadores
route.post('/cuid/register', cuidController.create);
route.post('/cuid/complete', authCuidMiddleware, cuidController.complete);
route.post('/cuid/authenticate', cuidController.auth);
route.post('/cuid/forgot_password', cuidController.recSenha);
route.post('/cuid/reset_password', cuidController.resSenha);


// Parte do USER

// Rotas de Cadastro/Login dos usuarios
route.post('/user/register', userController.create);
route.post('/user/authenticate', userController.auth);
route.post('/user/forgot_password', userController.recSenha);
route.post('/user/reset_password', userController.resSenha);


// Parte do PAC

// Rota para listar os pacientes
route.get('/user/pac', authUserMiddleware, pacController.index);
// Rota para cadastrar os pacientes
route.post('/user/pac/register', authUserMiddleware, pacController.create);
// Rota para editar os pacientes
route.put('/user/pac/edit/:id', authUserMiddleware, pacController.update);
// Rota para deletar os pacientes
route.delete('/user/pac/delete/:id', authUserMiddleware, pacController.delete);


// Parte do PED

// Rota para listar os pedidos
route.get('/user/ped/', authUserMiddleware, pedController.index);
// Rota para cadastrar os pedidos
route.post('/user/ped/:pac_id/:cuid_id/register', authUserMiddleware, pedController.create);
// Rota para editar os pedidos
route.put('/user/ped/:id/edit', authUserMiddleware, pedController.update);
// Rota para apagar os pedidos
route.delete('/user/ped/:id/delete', authUserMiddleware, pedController.delete);

module.exports = route;
