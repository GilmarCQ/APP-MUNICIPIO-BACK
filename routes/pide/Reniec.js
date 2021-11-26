const express = require('express');
const reniecController = require('../../controllers/pide/Reniec');
const reniecRouter = express.Router();

reniecRouter.get('/Consultar', reniecController.consultaDni);
reniecRouter.get('/ActualizarCredencial', reniecController.actualizarCredencial);
reniecRouter.get('/renovar', reniecController.renovarCredencial);

module.exports = { reniecRouter };
