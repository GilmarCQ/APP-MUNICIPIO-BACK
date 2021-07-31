const Sequelize = require('sequelize');
const usuarioModel = require('../models/Usuario');
const paginaModel = require('../models/Pagina');
const moduloModel = require('../models/Modulo');
const usuarioPaginaModel = require('../models/UsuarioPagina');
const usuarioModuloModel = require('../models/usuarioModulo');
const tipoDocumentoModel = require('../models/catalogos/TipoDocumento');
const asociacionModel = require('../models/catalogos/Asociacion');
const comportamientoModel = require('../models/catalogos/Comportamiento');
const observacionModel = require('../models/Observacion');
const mascotaModel = require('../models/mascotas/Mascota');
const mascotaComportamiento = require('../models/mascotas/MascotaComportamiento');
const mascotaPropietario = require('../models/mascotas/MascotaPropietario');
const mascotaObservacion = require('../models/mascotas/MascotaObservacion');
const personaModel = require('../models/Persona');

const conexion = new Sequelize(
    'municipio', 'postgres', 'root',
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
);
// const conexion = new Sequelize(
//     'municipiopruebas', 'mdy', 'qazWSX123456', {
//         host: '192.168.1.3',
//         dialect: 'postgres',
//         port: 5432
//     }
// );

const Usuario = usuarioModel(conexion);
const Pagina = paginaModel(conexion);
const Modulo = moduloModel(conexion);
// const PaginaModulo = moduloPaginaModel(conexion);
const UsuarioPagina = usuarioPaginaModel(conexion);
const UsuarioModulo = usuarioModuloModel(conexion);
const TipoDocumento = tipoDocumentoModel(conexion);
const Asociacion = asociacionModel(conexion);
const Comportamiento = comportamientoModel(conexion);
const Observacion = observacionModel(conexion);
const Mascota = mascotaModel(conexion);
const Persona = personaModel(conexion);
const MascotaComportamiento = mascotaComportamiento(conexion);
const MascotaPropietario = mascotaPropietario(conexion);
const MascotaObservacion = mascotaObservacion(conexion);


Pagina.belongsTo(Modulo);
Modulo.hasMany(Pagina);
Usuario.belongsToMany(Modulo, {through: UsuarioModulo});
Modulo.belongsToMany(Usuario, {through: UsuarioModulo});
Usuario.belongsToMany(Pagina, {through: UsuarioPagina});
Pagina.belongsToMany(Usuario, {through: UsuarioPagina});
Mascota.belongsToMany(Comportamiento, {through: MascotaComportamiento, foreignKey: 'mascotaId'});
Comportamiento.belongsToMany(Mascota, {through: MascotaComportamiento, foreignKey: 'comportamientoId'});
Mascota.belongsToMany(Persona, {through: MascotaPropietario, foreignKey: 'mascotaId'});
Persona.belongsToMany(Mascota, {through: MascotaPropietario, foreignKey: 'personaId'});
Mascota.belongsToMany(Observacion, {through: MascotaObservacion, foreignKey: 'mascotaId', as: 'observaciones'});
Observacion.belongsToMany(Mascota, {through: MascotaObservacion, foreignKey: 'observacionId'});

module.exports = {
    conexion, Usuario, Pagina, Modulo, UsuarioModulo, UsuarioPagina, TipoDocumento, Asociacion, Comportamiento, Mascota,
    Persona, MascotaComportamiento, MascotaPropietario, MascotaObservacion, Observacion
}
