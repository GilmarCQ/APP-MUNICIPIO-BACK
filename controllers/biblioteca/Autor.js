const { Autor, Editorial} = require('../../config/Sequelize');
const { Op } = require('sequelize');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');

const crearAutor = async (req, res) => {
    const {nombres, pseudonimo, nacionalidad, correo} = req.body.autor;
    const autor = {
        nombres: nombres.toUpperCase(),
        pseudonimo: pseudonimo.toUpperCase(),
        nacionalidad: nacionalidad.toUpperCase(),
        correo: correo.toUpperCase()
    };
    const autorBuild = Autor.build(autor);
    const autorFinded = await findAutorByName(nombres.toUpperCase(), res);
    if (autorFinded) {
        httpBadRequest400(res, 'Registro duplicado.')
    } else {
        autorBuild
            .save(autorBuild)
            .then(autor => httpOk200NoContent(res, 'Registro Agregado correctamente.'))
            .catch(error => httpError500(res, error));
    }
}
const buscarAutorPorId = (req, res) => {
    const { id } = req.query;
    Autor
        .findOne({
            where: {id},
            attributes: ['id', 'nombres', 'pseudonimo', 'nacionalidad', 'correo']
        })
        .then(autorFinded => httpOk200Content(res, autorFinded, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const paginaAutores = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Autor
        .findAndCountAll({
            where: {},
            attributes: ['id', 'nombres', 'nacionalidad', 'pseudonimo', 'correo'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(autores => {
            const data = getPagingData(autores, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const editarAutor = async (req, res) => {
    const { autor } = req.body;
    const autorFinded = await findAutorById(autor.id, res);
    if (autorFinded) {
        autorFinded.nombres = autor.nombres.toUpperCase();
        autorFinded.pseudonimo = autor.pseudonimo.toUpperCase();
        autorFinded.correo = autor.correo.toUpperCase();
        autorFinded.nacionalidad = autor.nacionalidad.toUpperCase();
        autorFinded
            .save(autorFinded)
            .then(autorEdited => httpOk200NoContent(res, 'Acción realizada correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const eliminarAutor = async (req, res) => {
    const { id } = req.query;
    const autorFinded = await findAutorById(id, res);
    if (autorFinded) {
        Autor
            .destroy({ where: { id: autorFinded.id } })
            .then(autorDeleted => httpOk200NoContent(res, 'Registro eliminado correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const filtrarAutores = async (req, res) => {
    const { order_by, sort_by, page, size, nombres } = req.query;
    Autor
        .findAndCountAll({
            where: {
                nombres: {
                    [Op.iLike]: `%${nombres.toUpperCase()}%`
                }
            },
            attributes: ['id', 'nombres', 'nacionalidad', 'pseudonimo', 'correo'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(autores => {
            const data = getPagingData(autores, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const listarAutores = (req, res) => {
    Autor.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    })
        .then(autores => httpOk200Content(res, autores, 'Consulta Realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const findAutorByName = (nombres, res) => {
    return Autor.findOne({ where: { nombres } });
}
const findAutorById = (id, res) => {
    return Autor.findOne({ where: { id } });
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
module.exports = {
    crearAutor,
    paginaAutores,
    buscarAutorPorId,
    editarAutor,
    eliminarAutor,
    filtrarAutores,
    listarAutores
}
