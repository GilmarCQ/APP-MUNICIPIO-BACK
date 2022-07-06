const express = require('express');
const tipoTutor = require('../../controllers/catalogos/TipoTutor');
const tipoTutorRouter = express.Router();

tipoTutorRouter.get('/listar', tipoTutor.listTipoTutor);

module.exports = { tipoTutorRouter }

