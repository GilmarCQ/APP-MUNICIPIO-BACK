const { Asociacion } = require('../../config/Sequelize');
const { Comportamiento } = require('../../config/Sequelize');
const { TipoDocumento } = require('../../config/Sequelize');
const { httpOk200Content, httpError500 } = require('../../utils/httpMessages');

const listarAsociaciones = (req, res) => {
    Asociacion
        .findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'removedAt'] }})
        .then( lista => httpOk200Content(res, lista, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

const listarComportamientos = (req, res) => {
    Comportamiento.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})
        .then(lista => httpOk200Content(res, lista, 'Consulta realizada con éxito.'))
        .catch(error => httpError500(res, error));
}

const listarTipoDocumentos = (req, res) => {
    TipoDocumento
        .findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})
        .then(data => httpOk200Content(res, data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

module.exports = {
    listarAsociaciones, listarComportamientos, listarTipoDocumentos
}
