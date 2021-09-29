const areaController = require('../../controllers/entidad/Area');
const express = require('express');
const areaRouter = express.Router();

areaRouter.post('/crear', areaController.crearArea);
areaRouter.get('/paginar', areaController.paginarAreas);
areaRouter.get('/buscar', areaController.buscarAreaPorId);
areaRouter.get('/listarPorNombre', areaController.listarAreasPorNombre);
areaRouter.get('/listar', areaController.listarAreas);

module.exports = { areaRouter }
