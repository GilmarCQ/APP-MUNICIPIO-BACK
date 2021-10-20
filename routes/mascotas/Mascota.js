const express = require('express');
const mascotaController = require('../../controllers/mascotas/Mascota');
const usuarioController = require('../../controllers/Usuario');
const mascotaRouter = express.Router();

mascotaRouter.post('/crear', mascotaController.crearMascota);
mascotaRouter.get('/buscarPorPersona', mascotaController.getMascotasByDocumento);
mascotaRouter.get('/buscarPorRegistro', mascotaController.getMascotasByRegistro);
mascotaRouter.get('/buscarPorEstado', mascotaController.getMascotasByEstado);
mascotaRouter.get('/descargarRegistro', mascotaController.buscarFichaRegistro);
mascotaRouter.get('/buscarPorId', mascotaController.getMascotaById);
mascotaRouter.post('/aprobarPorId', mascotaController.aprobarMascotaById);
mascotaRouter.post('/observarPorId', mascotaController.observarMascotaById);
mascotaRouter.delete('/subsanarObservacionPorId', mascotaController.subsanarObservacionById);

module.exports = {
    mascotaRouter
}
