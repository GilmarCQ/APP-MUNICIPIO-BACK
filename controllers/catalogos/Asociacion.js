const { Asociacion } = require('../../config/Sequelize');
const { httpOk200Content, httpError500 } = require('../../utils/httpMessages');

const listarAsociaciones = (req, res) => {
    Asociacion
        .findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'removedAt', 'deletedAt'] }})
        .then( lista => httpOk200Content(res, lista, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
module.exports = {
    listarAsociaciones
}
