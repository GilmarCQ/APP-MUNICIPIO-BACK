const express = require('express');
const generoRouter = express.Router();
const generoController = require('../../controllers/biblioteca/Genero');

generoRouter.post('/crear', generoController.crearGenero);
generoRouter.put('/editar', generoController.editarGenero);
generoRouter.get('/paginar', generoController.paginarGeneros);
generoRouter.get('/listar', generoController.listarGeneros);
generoRouter.get('/buscar', generoController.buscarGeneroPorId);
generoRouter.get('/filtrar', generoController.filtrarGeneros);
generoRouter.delete('/eliminar', generoController.eliminarGenero);

module.exports = { generoRouter }
