const express = require('express');

const comportamientoController = require('../../controllers/catalogos/Asociacion');
const comportamientoRouter = express.Router();

comportamientoRouter.get('/listar', comportamientoController.listarAsociaciones);

module.exports = { comportamientoRouter }