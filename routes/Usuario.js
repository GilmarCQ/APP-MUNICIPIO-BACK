const express = require('express');
const usuario = require('../controllers/Usuario');
const usuarioRouter = express.Router();

usuarioRouter.post('/crear', usuario.tokenIsValid , usuario.createUser);
usuarioRouter.put('/editar-nombre-usuario', usuario.tokenIsValid, usuario.editUserName);
usuarioRouter.put('/editar-password', usuario.updatePassword);
usuarioRouter.delete('/eliminar', usuario.deleteUser);
usuarioRouter.get('/listar', usuario.tokenIsValid, usuario.listUsers);
usuarioRouter.post('/login', usuario.login);
usuarioRouter.get('/token-valid', usuario.tokenIsValid);


module.exports = {usuarioRouter};

