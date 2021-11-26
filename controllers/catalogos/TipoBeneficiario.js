const { TipoBeneficiario } = require('../../config/Sequelize');
const { Op } = require('sequelize');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');

const crearTipoBeneficiario = async (req, res) => {
    const nombre = req.body.tipoBeneficiario.nombre.toUpperCase();
    console.log('Creacion Tipo Beneficiario');
    console.log(req.body);
    console.log(nombre);
    const tipoBeneficiarioBuild = TipoBeneficiario.build({ nombre });
    const tipoBeneficiarioFinded = await findTipoBeneficiarioByName(nombre.toUpperCase(), res);
    if (tipoBeneficiarioFinded) {
        httpBadRequest400(res, 'Registro duplicado.')
    } else {
        tipoBeneficiarioBuild
            .save(tipoBeneficiarioBuild)
            .then(tipoBeneficiario => httpOk200NoContent(res, 'Registro Agregado correctamente.'))
            .catch(error => httpError500(res, error));
    }
}
const buscarTipoBeneficiarioPorId = (req, res) => {
    const { id } = req.query;
    TipoBeneficiario
        .findOne({
            where: {id},
            attributes: ['id', 'nombre']
        })
        .then(tipoBeneficiarioFinded => httpOk200Content(res, tipoBeneficiarioFinded, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const paginarTiposBeneficiario = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    TipoBeneficiario
        .findAndCountAll({
            where: {},
            attributes: ['id', 'nombre'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(tiposBeneficiario => {
            const data = getPagingData(tiposBeneficiario, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const editarTipoBeneficiario = async (req, res) => {
    const { tipoBeneficiario } = req.body;
    console.log(tipoBeneficiario);
    const tipoBeneficiarioFinded = await findTipoBeneficiarioById(tipoBeneficiario.id, res);
    if (tipoBeneficiarioFinded) {
        tipoBeneficiarioFinded.nombre = tipoBeneficiario.nombre.toUpperCase();
        tipoBeneficiarioFinded
            .save(tipoBeneficiarioFinded)
            .then(tipoBeneficiarioEdited => httpOk200NoContent(res, 'Acción realizada correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const eliminarTipoBeneficiario = async (req, res) => {
    const { id } = req.query;
    const tipoBeneficiarioFinded = await findTipoBeneficiarioById(id, res);
    if (tipoBeneficiarioFinded) {
        TipoBeneficiario
            .destroy({ where: { id: tipoBeneficiarioFinded.id } })
            .then(tipoBeneficiarioDeleted => httpOk200NoContent(res, 'Registro eliminado correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const filtrarTiposBeneficiario = async (req, res) => {
    const { order_by, sort_by, page, size, nombre } = req.query;
    TipoBeneficiario
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
        .then(tiposBeneficiario => {
            const data = getPagingData(tiposBeneficiario, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const listarTiposBeneficiario = (req, res) => {
    TipoBeneficiario.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    })
        .then(tiposBeneficiario => httpOk200Content(res, tiposBeneficiario, 'Consulta Realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

const findTipoBeneficiarioByName = (nombre, res) => {
    return TipoBeneficiario.findOne({ where: { nombre } });
}
const findTipoBeneficiarioById = (id, res) => {
    return TipoBeneficiario.findOne({ where: { id } });
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
module.exports = {
    crearTipoBeneficiario,
    paginarTiposBeneficiario,
    buscarTipoBeneficiarioPorId,
    editarTipoBeneficiario,
    eliminarTipoBeneficiario,
    filtrarTiposBeneficiario,
    listarTiposBeneficiario
}
