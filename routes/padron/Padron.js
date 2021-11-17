const express = require('express');
const padronController = require('../../controllers/padron/Padron');
const padronRouter = express.Router();

padronRouter.post('/crear', padronController.crearPadron);
padronRouter.get('/paginar', padronController.paginarPadrones);
padronRouter.get('/buscarPorId', padronController.buscarPadronPorId);

module.exports = { padronRouter }
