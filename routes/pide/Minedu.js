const express = require('express');
const mineduController = require('../../controllers/pide/Minedu');
const mineduRouter = express.Router();

mineduRouter.get('/Titulo', mineduController.consultaTitulosYGrados);

module.exports = { mineduRouter }
