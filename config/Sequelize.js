const Sequelize = require('sequelize');

const entidadModel = require('../models/entidad/Entidad');
const sedeModel = require('../models/entidad/Sede');
const areaModel = require('../models/entidad/Area');
const areaJerarquia = require('../models/entidad/AreaJerarquia');
const funcionarioModel = require('../models/entidad/Funcionario');
const areaFuncionarioModel = require('../models/entidad/AreaFuncionario');

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

const autorModel = require('../models/biblioteca/Autor');
const editorialModel = require('../models/biblioteca/Editorial');
const generoModel = require('../models/biblioteca/Genero');
const libroModel = require('../models/biblioteca/Libro');
const libroBibliotecaModel = require('../models/biblioteca/LibroBiblioteca');
const libroAutorModel = require('../models/biblioteca/LibroAutor');
const libroGeneroModel = require('../models/biblioteca/LibroGenero');

const visitaModel = require('../models/visitas/Visita');
const visitanteModel = require('../models/visitas/Visitante');


// const conexion = new Sequelize(
//     'municipio', 'postgres', 'root',
//     {
//         host: 'localhost',
//         dialect: 'postgres',
//         port: 5432
//     }
// );
// const conexion = new Sequelize(
//     'municipiopruebas', 'mdy', 'qazWSX123456', {
//         host: '192.168.1.3',
//         dialect: 'postgres',
//         port: 5432
//     }
// );
const conexion = new Sequelize(
    'municipio', 'mdy', 'qazWSX123456', {
        host: '192.168.1.3',
        dialect: 'postgres',
        port: 5432
    }
);

const Entidad = entidadModel(conexion);
const Sede = sedeModel(conexion);
const Area = areaModel(conexion);
const Funcionario = funcionarioModel(conexion);
const AreaFuncionario = areaFuncionarioModel(conexion);
const AreaJerarquia = areaJerarquia(conexion);

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
const Editorial = editorialModel(conexion);
const Autor = autorModel(conexion);
const Genero = generoModel(conexion);
const Libro = libroModel(conexion);
const LibroBiblioteca = libroBibliotecaModel(conexion);
const LibroAutor = libroAutorModel(conexion);
const LibroGenero = libroGeneroModel(conexion);
const Visita = visitaModel(conexion);
const Visitante = visitanteModel(conexion);

// Definicion de Relaciones entre tablas
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
Libro.hasMany(LibroBiblioteca, { foreignKey: 'libroId' });
Editorial.hasOne(Libro, { foreignKey: 'editorialId' });
Libro.belongsToMany(Autor, { through: LibroAutor, foreignKey: 'libroId' });
Autor.belongsToMany(Libro, { through: LibroAutor, foreignKey: 'autorId' });
Libro.belongsToMany(Genero,  { through: LibroGenero});
Genero.belongsToMany(Libro,  { through: LibroGenero});
Entidad.hasMany(Sede);
Visita.belongsTo(Visitante);
Visitante.hasOne(Visita);
Visita.belongsTo(Sede);
Visita.belongsTo(AreaFuncionario);
Visitante.belongsTo(Persona);
Persona.hasOne(Visitante);
Funcionario.belongsTo(Persona, { foreignKey: 'personaId' });
Area.belongsToMany(Funcionario, { through: AreaFuncionario, foreignKey: 'areaId'});
Funcionario.belongsToMany(Area, { through: AreaFuncionario, foreignKey: 'funcionarioId'});
Funcionario.hasMany(AreaFuncionario);
AreaFuncionario.belongsTo(Funcionario);
Area.hasMany(AreaFuncionario);
AreaFuncionario.belongsTo(Area);
Area.hasOne(AreaJerarquia, { foreignKey: 'areaBaseId' });
Area.hasOne(AreaJerarquia, { foreignKey: 'areaSuperiorId' });

module.exports = {
    conexion, Usuario, Pagina, Modulo, UsuarioModulo, UsuarioPagina, TipoDocumento, Asociacion, Comportamiento, Mascota,
    Persona, MascotaComportamiento, MascotaPropietario, MascotaObservacion, Observacion, Autor, Editorial, Genero,
    Libro, LibroBiblioteca, LibroAutor, LibroGenero, Area, Funcionario, AreaFuncionario, AreaJerarquia, Visita, Visitante
}
