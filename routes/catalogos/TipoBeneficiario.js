const express = require('express');
const tipoBeneficiarioRouter = express.Router();
const tipoBeneficiarioController = require('../../controllers/catalogos/TipoBeneficiario');

tipoBeneficiarioRouter.post('/crear', tipoBeneficiarioController.crearTipoBeneficiario);
tipoBeneficiarioRouter.put('/editar', tipoBeneficiarioController.editarTipoBeneficiario);
tipoBeneficiarioRouter.get('/paginar', tipoBeneficiarioController.paginarTiposBeneficiario);
tipoBeneficiarioRouter.get('/buscar', tipoBeneficiarioController.buscarTipoBeneficiarioPorId);
tipoBeneficiarioRouter.get('/filtrar', tipoBeneficiarioController.filtrarTiposBeneficiario);
tipoBeneficiarioRouter.get('/listar', tipoBeneficiarioController.listarTiposBeneficiario);
tipoBeneficiarioRouter.delete('/eliminar', tipoBeneficiarioController.eliminarTipoBeneficiario);

module.exports = { tipoBeneficiarioRouter }
