const express = require('express');
const reniecController = require('../../controllers/pide/Reniec');
const reniecRouter = express.Router();

reniecRouter.get('/Consultar', reniecController.consultaDni);
reniecRouter.get('/ActualizarCredencial', reniecController.actualizarCredencial);

module.exports = { reniecRouter };
