const { Genero, Editorial} = require('../../config/Sequelize');
const { Op } = require('sequelize');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');

const crearGenero = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase();
    const editorialBuild = Genero.build({ nombre });
    const editorialFinded = await findGeneroByName(nombre.toUpperCase(), res);
    if (editorialFinded) {
        httpBadRequest400(res, 'Registro duplicado.')
    } else {
        editorialBuild
            .save(editorialBuild)
            .then(editorial => httpOk200NoContent(res, 'Registro Agregado correctamente.'))
            .catch(error => httpError500(res, error));
    }
}
const buscarGeneroPorId = (req, res) => {
    const { id } = req.query;
    Genero
        .findOne({
            where: {id},
            attributes: ['id', 'nombre']
        })
        .then(editorialFinded => httpOk200Content(res, editorialFinded, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const paginarGeneros = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Genero
        .findAndCountAll({
            where: {},
            attributes: ['id', 'nombre'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(editoriales => {
            const data = getPagingData(editoriales, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const editarGenero = async (req, res) => {
    const { editorial } = req.body;
    console.log(editorial);
    const editorialFinded = await findGeneroById(editorial.id, res);
    if (editorialFinded) {
        editorialFinded.nombre = editorial.nombre.toUpperCase();
        editorialFinded
            .save(editorialFinded)
            .then(editorialEdited => httpOk200NoContent(res, 'Acción realizada correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const eliminarGenero = async (req, res) => {
    const { id } = req.query;
    const editorialFinded = await findGeneroById(id, res);
    if (editorialFinded) {
        Genero
            .destroy({ where: { id: editorialFinded.id } })
            .then(editorialDeleted => httpOk200NoContent(res, 'Registro eliminado correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const filtrarGeneros = async (req, res) => {
    const { order_by, sort_by, page, size, nombre } = req.query;
    Genero
        .findAndCountAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${nombre.toUpperCase()}%`
                }
            },
            attributes: ['id', 'nombre'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(editoriales => {
            const data = getPagingData(editoriales, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const listarGeneros = (req, res) => {
    Genero.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    })
        .then(editoriales => httpOk200Content(res, editoriales, 'Consulta Realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

const findGeneroByName = (nombre, res) => {
    return Genero.findOne({ where: { nombre } });
}
const findGeneroById = (id, res) => {
    return Genero.findOne({ where: { id } });
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
module.exports = {
    crearGenero,
    listarGeneros,
    paginarGeneros,
    buscarGeneroPorId,
    editarGenero,
    eliminarGenero,
    filtrarGeneros
}
