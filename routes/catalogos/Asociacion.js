const express = require('express');
const asociacionController = require('../../controllers/catalogos/Asociacion');
const asociacionRouter = express.Router();

asociacionRouter.get('/listar', asociacionController.listarAsociaciones);

module.exports = { asociacionRouter }
