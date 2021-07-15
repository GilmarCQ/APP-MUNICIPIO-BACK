const express = require('express');
const tipoDocumento = require('../../controllers/catalogos/TipoDocumento');
const tipoDocumentoRouter = express.Router();

tipoDocumentoRouter.get('/listar', tipoDocumento.listTipoDocumentos);

module.exports = { tipoDocumentoRouter }

