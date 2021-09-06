const express = require('express');
const sunarpController = require('../../controllers/pide/Sunarp');
const sunarpRouter = express.Router();

sunarpRouter.get('/NaveAeronave', sunarpController.consultaNaveAeronave);
sunarpRouter.get('/PJRazonSocial', sunarpController.consultaPJRazonSocial);
sunarpRouter.get('/Titularidad', sunarpController.consultaTitularidad);
sunarpRouter.get('/Oficinas', sunarpController.consultaOficinas);
sunarpRouter.get('/ListarAsientos', sunarpController.consultaAsientos);
sunarpRouter.get('/VerAsientos', sunarpController.consultaAsiento);
sunarpRouter.get('/VerDetalleRPV', sunarpController.consultaDetalleRPV);
sunarpRouter.get('/VerDetalleRPVExtra', sunarpController.consultaDetalleRPVExtra);
sunarpRouter.get('/Verificador', sunarpController.consultaVerificador);

module.exports = { sunarpRouter }
