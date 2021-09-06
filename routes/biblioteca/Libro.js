const express = require('express');
const libroRouter = express.Router();
const libroController = require('../../controllers/biblioteca/Libro');

libroRouter.post('/crear', libroController.crearLibro);
libroRouter.get('/paginar', libroController.paginarLibros);
libroRouter.get('/buscar', libroController.buscarLibroPorId);

module.exports = { libroRouter }