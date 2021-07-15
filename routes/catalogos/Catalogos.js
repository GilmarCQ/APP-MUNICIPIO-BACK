const express = require('express');
const catalogoController = require('../../controllers/catalogos/Catalogo');
const catalogoRouter = express.Router();

catalogoRouter.get('/asociacion/listar', catalogoController.listarAsociaciones);
catalogoRouter.get('/tipoDocumento/listar', catalogoController.listarTipoDocumentos);
catalogoRouter.get('/comportamiento/listar', catalogoController.listarComportamientos);


module.exports = {
    catalogoRouter
}
