const { TipoDocumento } = require('../../config/Sequelize');
const { httpOk200Content, httpError500 } = require('../../utils/httpMessages');

const listTipoDocumentos = (req, res) => {
    TipoDocumento
        .findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})
        .then(data => httpOk200Content(res, data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

module.exports = {
    listTipoDocumentos }