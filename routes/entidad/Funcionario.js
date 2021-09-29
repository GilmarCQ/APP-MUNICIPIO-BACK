const express = require('express');
const funcionarioController = require('../../controllers/entidad/Funcionario');
const funcionarioRouter = express.Router();

funcionarioRouter.post('/crear', funcionarioController.crearFuncionario);
funcionarioRouter.get('/paginar', funcionarioController.paginarFuncionarios);
funcionarioRouter.get('/listar', funcionarioController.listarFuncionarios);
funcionarioRouter.delete('/eliminar', funcionarioController.eliminarFuncionario);

module.exports = { funcionarioRouter }