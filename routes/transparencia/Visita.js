const visitaController = require('../../controllers/transparencia/Visita');
const express = require('express');
const visitaRouter = express.Router();

visitaRouter.post('/registro', visitaController.registrarVisita);
visitaRouter.get('/listar-pendientes', visitaController.listarPendientesByPersona);
visitaRouter.get('/paginar-pendientes', visitaController.paginarVisitasPendientes);
visitaRouter.get('/paginar', visitaController.paginarVisitas);
visitaRouter.put('/actualizar-salida', visitaController.actualizarHoraSalida);

module.exports = { visitaRouter }
