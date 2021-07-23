const axios = require('axios');
const {
    httpError500,
    httpOk200Content,
    httpError400} = require('../../utils/httpMessages');
const API_SUNEDU = 'https://ws3.pide.gob.pe/Rest/Sunedu';

const consultaSuneduByDNI = (req, res) => {
    const { usuario, clave, idEntidad, fecha, hora, mac_wsServer, ip_wsServer, ip_wsUser, nroDocIdentidad } = req.query;
    axios
        .get(`${API_SUNEDU}/Grados`,
            {
                params: {
                    usuario,
                    clave,
                    idEntidad,
                    fecha,
                    hora,
                    mac_wsServer,
                    ip_wsServer,
                    ip_wsUser,
                    nroDocIdentidad,
                    out: 'json'
                }
            })
        .then(response => {
                httpOk200Content(res, response.data, 'Consulta Realizada Correctamente')
        })
        .catch(error => httpError500(res, error));
}

module.exports = {
    consultaSuneduByDNI
}
