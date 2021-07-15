const express = require('express');
const reniec = require('../../controllers/pide/Reniec');
const reniecRouter = express.Router();

reniecRouter.get('/Consultar', reniec.consultaDni);
reniecRouter.get('/ActualizarCredencial', reniec.actualizarCredencial);

module.exports = { reniecRouter };
