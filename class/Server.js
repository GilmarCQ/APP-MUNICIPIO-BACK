const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {conexion} = require('../config/Sequelize');
const {usuarioRouter} = require('../routes/Usuario');
const { reniecRouter } = require('../routes/pide/Reniec');
const { suneduRouter } = require('../routes/pide/Sunedu');
const { mineduRouter } = require('../routes/pide/Minedu');
const { tipoDocumentoRouter } = require('../routes/catalogos/TipoDocumento');
const { asociacionRouter } = require('../routes/catalogos/Asociacion');
const { comportamientoRouter } = require('../routes/catalogos/Comportamiento');
const { catalogoRouter } = require('../routes/catalogos/Catalogos');
const { mascotaRouter } = require('../routes/mascotas/Mascota');

class Server {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.puerto = process.env.PORT || 5001;
        this.configurarParser();
        this.cargarRutas();
    }
    configurarParser() {
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb'}));
    }
    cargarRutas() {
        this.app.get('/', (req,res) =>
            res.status(200).send('La api esta funcionando correctamente'));
        this.app.use('/usuario', usuarioRouter);
        this.app.use('/Reniec', reniecRouter);
        this.app.use('/Sunedu', suneduRouter);
        this.app.use('/Minedu', mineduRouter);
        this.app.use('/tipoDocumento', tipoDocumentoRouter);
        this.app.use('/asociacion', asociacionRouter);
        this.app.use('/comportamiento', comportamientoRouter);
        this.app.use('/catalogo', catalogoRouter);
        this.app.use('/mascota', mascotaRouter);
    }
    start() {
        this.app.listen(this.puerto, () => console.log(`Todo operativo en el puerto ${this.puerto}`));
        conexion.sync({alter: true, force: false}).then(() => console.log('Base de datos sincronizada.'))
    }
}
module.exports = Server;