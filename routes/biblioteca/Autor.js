const express = require('express');
const autorRouter = express.Router();
const autorController = require('../../controllers/biblioteca/Autor');

autorRouter.post('/crear', autorController.crearAutor);
autorRouter.put('/editar', autorController.editarAutor);
autorRouter.get('/paginar', autorController.paginaAutores);
autorRouter.get('/listar', autorController.listarAutores);
autorRouter.get('/buscar', autorController.buscarAutorPorId);
autorRouter.get('/filtrar', autorController.filtrarAutores);
autorRouter.delete('/eliminar', autorController.eliminarAutor);

module.exports = { autorRouter }
