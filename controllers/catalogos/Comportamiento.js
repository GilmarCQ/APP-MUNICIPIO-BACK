const { Comportamiento } = require('../../config/Sequelize');
const { httpOk200Content, httpError500 } = require('../../utils/httpMessages');
const listComportamientos = (req, res) => {
    Comportamiento.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }})
        .then(lista => httpOk200Content(res, lista, 'Consulta realizada con éxito.'))
        .catch(error => httpError500(res, error));
}

module.exports = {
    listComportamientos
}
