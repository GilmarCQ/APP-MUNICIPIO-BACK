const express = require('express');
const suneduController = require('../../controllers/pide/Sunedu');
const suneduRouter = express.Router();

suneduRouter.get('/Grados', suneduController.consultaSuneduByDNI)

module.exports = { suneduRouter }
