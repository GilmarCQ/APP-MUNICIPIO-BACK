const areaFuncionarioController = require('../../controllers/entidad/AreaFuncionario');
const express = require('express');
const areaFuncionarioRouter = express.Router();

areaFuncionarioRouter.post('/crear', areaFuncionarioController.crearCargo);
areaFuncionarioRouter.get('/paginar', areaFuncionarioController.paginarCargosFuncionarios);
areaFuncionarioRouter.get('/listar', areaFuncionarioController.listarCargosFuncionarios);

module.exports = { areaFuncionarioRouter }
