const express = require('express');
const mascotaController = require('../../controllers/mascotas/Mascota');
const mascotaRouter = express.Router();

mascotaRouter.post('/crear', mascotaController.crearMascota);
mascotaRouter.get('/buscarPorPersona', mascotaController.getMascotasByDocumento);
mascotaRouter.get('/buscarPorRegistro', mascotaController.getMascotasByRegistro);
mascotaRouter.get('/descargarRegistro', mascotaController.buscarFichaRegistro);

module.exports = {
    mascotaRouter
}
