const express = require('express');
const editorialRouter = express.Router();
const editorialController = require('../../controllers/biblioteca/Editorial');

editorialRouter.post('/crear', editorialController.crearEditorial);
editorialRouter.put('/editar', editorialController.editarEditorial);
editorialRouter.get('/paginar', editorialController.paginarEditoriales);
editorialRouter.get('/buscar', editorialController.buscarEditorialPorId);
editorialRouter.get('/filtrar', editorialController.filtrarEditoriales);
editorialRouter.get('/listar', editorialController.listarEditoriales);
editorialRouter.delete('/eliminar', editorialController.eliminarEditorial);

module.exports = { editorialRouter }
