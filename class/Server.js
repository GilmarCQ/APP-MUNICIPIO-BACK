const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const { conexion } = require('../config/Sequelize');
const { usuarioRouter } = require('../routes/Usuario');
const { reniecRouter } = require('../routes/pide/Reniec');
const { suneduRouter } = require('../routes/pide/Sunedu');
const { mineduRouter } = require('../routes/pide/Minedu');
const { sunarpRouter } = require('../routes/pide/Sunarp');
const { tipoDocumentoRouter } = require('../routes/catalogos/TipoDocumento');
const { asociacionRouter } = require('../routes/catalogos/Asociacion');
const { comportamientoRouter } = require('../routes/catalogos/Comportamiento');
const { catalogoRouter } = require('../routes/catalogos/Catalogos');
const { mascotaRouter } = require('../routes/mascotas/Mascota');
const { editorialRouter } = require('../routes/biblioteca/Editorial');
const { generoRouter } = require('../routes/biblioteca/Genero');
const { autorRouter } = require('../routes/biblioteca/Autor');
const { libroRouter } = require('../routes/biblioteca/Libro');
const { funcionarioRouter } = require('../routes/entidad/Funcionario');
const { areaRouter } = require('../routes/entidad/Area');
const { areaFuncionarioRouter } = require('../routes/entidad/AreaFuncionario');
const { visitaRouter } = require('../routes/transparencia/Visita');
const { padronRouter } = require('../routes/padron/Padron');
const { tipoBeneficiarioRouter } = require('../routes/catalogos/TipoBeneficiario');
const { tipoTutorRouter } = require('../routes/catalogos/TipoTutor');

class Server {
    constructor() {

        dotenv.config();
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
        this.app.use('/Sunarp', sunarpRouter);
        this.app.use('/tipoDocumento', tipoDocumentoRouter);
        this.app.use('/asociacion', asociacionRouter);
        this.app.use('/comportamiento', comportamientoRouter);
        this.app.use('/catalogo', catalogoRouter);
        this.app.use('/mascota', mascotaRouter);
        this.app.use('/editorial', editorialRouter);
        this.app.use('/genero', generoRouter);
        this.app.use('/autor', autorRouter);
        this.app.use('/libro', libroRouter);
        this.app.use('/funcionario', funcionarioRouter);
        this.app.use('/area', areaRouter);
        this.app.use('/cargoFuncionario', areaFuncionarioRouter);
        this.app.use('/visitas', visitaRouter);
        this.app.use('/padron', padronRouter);
        this.app.use('/tipoBeneficiario', tipoBeneficiarioRouter);
        this.app.use('/tipoTutor', tipoTutorRouter);
    }
    start() {
        this.app.listen(this.puerto, () => console.log(`Todo operativo en el puerto ${this.puerto}`));
        conexion.sync({alter: false, force: false}).then(() => console.log('Base de datos sincronizada.', this.puerto))
    }
}
module.exports = Server;