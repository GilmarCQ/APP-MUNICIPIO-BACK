const axios = require('axios');
const { httpOk200Content, httpError500 } = require('../../utils/httpMessages');

const API_MINEDU = 'https://ws3.pide.gob.pe/Rest/Minedu';

const consultaTitulosYGrados = (req, res) => {
    const { nroDocumento } = req.query;
    axios
        .get(`${API_MINEDU}/Titulo`,
            {
                params: {
                    nroDocumento,
                    out: 'json'
                }
        })
        .then(response => httpOk200Content(res, response.data, 'Consulta Realizada Correctamente.'))
        .catch(error => httpError500(res, error))
}

module.exports = { consultaTitulosYGrados }
