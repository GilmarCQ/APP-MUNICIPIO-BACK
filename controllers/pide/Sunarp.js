const axios = require('axios');
const {
    httpError500,
    httpOk200Content} = require('../../utils/httpMessages');
const API_SUNARP = 'https://ws5.pide.gob.pe/Rest/Sunarp';

const consultaNaveAeronave = (req, res) => {
    const { numeroMatricula } = req.query;
    axios
        .get(`${API_SUNARP}/NaveAeronave`,
            {
                params: {
                    numeroMatricula,
                    out: 'json'
                }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaPJRazonSocial = (req, res) => {
    const { razonSocial } = req.query;
    axios
        .get(`${API_SUNARP}/PJRazonSocial`,
            {
                params: {
                    razonSocial,
                    out: 'json'
                }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaTitularidad = (req, res) => {
    const { tipoParticipante, apellidoPaterno, apellidoMaterno, nombres, razonSocial } = req.query;
    let parametros;
    if (tipoParticipante === 'N') {
        parametros = {
            tipoParticipante,
            apellidoPaterno,
            apellidoMaterno,
            nombres,
            out: 'json'
        };
    } else {
        parametros = {
            tipoParticipante,
            razonSocial,
            out: 'json'
        }
    };
    axios
        .get(`${API_SUNARP}/Titularidad`, { params: parametros})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaOficinas = (req, res) => {
    axios
        .get(`${API_SUNARP}/Oficinas`,
            {
                params: { out: 'json' }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaAsientos = (req, res) => {
    const { zona, oficina, partida, registro } = req.query;
    axios
        .get(`${API_SUNARP}/ListarAsientos`,
            {
                params: {
                    zona,
                    oficina,
                    partida,
                    registro,
                    out: 'json'
                }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaAsiento = (req, res) => {
    const { transaccion, idImg, tipo, nroTotalPag, nroPagRef, pagina } = req.query;
    axios
        .get(`${API_SUNARP}/VerAsientos`,
            {
                params: {
                    transaccion,
                    idImg,
                    tipo,
                    nroTotalPag,
                    nroPagRef,
                    pagina,
                    out: 'json'
                }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaDetalleRPV = (req, res) => {
    const { zona, oficina, placa } = req.query;
    axios
        .get(`${API_SUNARP}/VerDetalleRPV`,
            {
                params: {
                    zona,
                    oficina,
                    placa,
                    out: 'json'
                }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaDetalleRPVExtra = (req, res) => {
    const { zona, oficina, placa } = req.query;
    axios
        .get(`${API_SUNARP}/VerDetalleRPVExtra`,
            {
                params: {
                    zona,
                    oficina,
                    placa,
                    out: 'json'
                }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaVerificador = (req, res) => {
    const { apPaterno, apMaterno, nombre } = req.query;
    axios
        .get(`${API_SUNARP}/Verificador`,
            {
                params: {
                    apPaterno,
                    apMaterno,
                    nombre,
                    out: 'json'
                }})
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}


module.exports = {
    consultaNaveAeronave, consultaPJRazonSocial, consultaTitularidad, consultaOficinas,
    consultaAsientos, consultaAsiento, consultaDetalleRPV, consultaDetalleRPVExtra, consultaVerificador
}
