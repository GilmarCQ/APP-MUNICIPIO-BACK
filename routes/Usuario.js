const express = require('express');
const usuario = require('../controllers/Usuario');
const usuarioRouter = express.Router();

usuarioRouter.post('/crear',  usuario.createUser);
usuarioRouter.put('/editar-nombre-usuario', usuario.tokenIsValid, usuario.editUserName);
usuarioRouter.put('/editar-password', usuario.updatePassword);
usuarioRouter.delete('/eliminar', usuario.deleteUser);
usuarioRouter.get('/paginar', usuario.paginarUsuarios);
usuarioRouter.post('/login', usuario.login);
usuarioRouter.get('/token-valid', usuario.tokenIsValid);


module.exports = {usuarioRouter};

