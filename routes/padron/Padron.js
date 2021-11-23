const express = require('express');
const padronController = require('../../controllers/padron/Padron');
const padronRouter = express.Router();

padronRouter.post('/crear', padronController.crearPadron);
padronRouter.post('/agregarBeneficiario', padronController.agregarBeneficiario);
padronRouter.get('/paginar', padronController.paginarPadrones);
padronRouter.get('/buscarPadronPorId', padronController.buscarPadronPorId);
padronRouter.get('/buscarPersonaPadron', padronController.buscarPersonaPorDocumentoPorIdPadron);

module.exports = { padronRouter }
