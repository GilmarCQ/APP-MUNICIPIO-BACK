const axios = require('axios').default;
const {
    httpError500, httpOk200Content
} = require('../../utils/httpMessages');
const API_SUNARP = 'https://ws5.pide.gob.pe/Rest/APide/Sunarp';
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();


const consultaNaveAeronave = (req, res) => {
    const {numeroMatricula} = req.query;
    axios
        .get(`${API_SUNARP}/NaveAeronave`, {
            params: {
                numeroMatricula, out: 'json'
            }
        })
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaPJRazonSocial = (req, res) => {
    const {razonSocial} = req.query;
    console.log(`${API_SUNARP}/WSServicePJRazonSocial`);
    axios
        .get(`${API_SUNARP}/WSServicePJRazonSocial`, {
            params: {
                razonSocial, clave: process.env.PASS_SUNARP, usuario: process.env.USER_SUNARP, out: 'json'
            }
        })
        .then(response => {
            console.log(response.config)
            httpOk200Content(res, response.data, 'Consulta realizada correctamente.')
        })
        .catch(error => {
            console.log(error)
            httpError500(res, error)
        });
}
/*
* Consulta Titularidad
* */
const consultaTitularidad = (req, res) => {
    const {tipoParticipante, apellidoPaterno, apellidoMaterno, nombres, razonSocial} = req.query;
    const url = new URL(`${API_SUNARP}/WSServiceTitularidadSIRSARP`);
    url.searchParams.set('usuario', process.env.USER_SUNARP);
    url.searchParams.set('clave', process.env.PASS_SUNARP);
    url.searchParams.set('out', 'json');
    url.searchParams.set('tipoParticipante', tipoParticipante);

    if (tipoParticipante === 'N') {
        url.searchParams.set('apellidoPaterno', apellidoPaterno);
        url.searchParams.set('apellidoMaterno', apellidoMaterno);
        url.searchParams.set('nombres', nombres);
    } else {
        url.searchParams.set('razonSocial', razonSocial);
    }
    apiGetHttp(res, url);
}
/*
* Consumo de Servicios actualizado a la version SIRSARP
* */
const consultaOficinas = (req, res) => {
    let url = new URL(`${API_SUNARP}/WSServicegetOficinas`);
    url.searchParams.set('usuario', process.env.USER_SUNARP);
    url.searchParams.set('clave', process.env.PASS_SUNARP);
    url.searchParams.set('out', 'json');
    apiGetHttp(res, url);
}
/*
* Listar Asientos
* */
const consultaAsientos = (req, res) => {
    const {zona, oficina, partida, registro} = req.query;
    const url = new URL(`${API_SUNARP}/WSServicelistarAsientosSIRSARP`);
    url.searchParams.set('usuario', process.env.USER_SUNARP);
    url.searchParams.set('clave', process.env.PASS_SUNARP);
    url.searchParams.set('out', 'json');
    url.searchParams.set('zona', zona);
    url.searchParams.set('oficina', oficina);
    url.searchParams.set('partida', partida);
    url.searchParams.set('registro', registro);
    apiGetHttp(res, url);
}
/*
* Listar Asiento PENDIENTE
* */
const consultaAsiento = (req, res) => {
    const {transaccion, idImg, tipo, nroTotalPag, nroPagRef, pagina} = req.query;
    const url = new URL(`${API_SUNARP}/WSServiceverAsientosSIRSARP`);
    url.searchParams.set('usuario', process.env.USER_SUNARP);
    url.searchParams.set('clave', process.env.PASS_SUNARP);
    url.searchParams.set('out', 'json');
    url.searchParams.set('transaccion', transaccion);
    url.searchParams.set('idImg', idImg);
    url.searchParams.set('tipo', tipo);
    url.searchParams.set('nroTotalPag', nroTotalPag);
    url.searchParams.set('nroPagRef', nroPagRef);
    url.searchParams.set('pagina', pagina);
    apiGetHttp(res, url)
}
const consultaDetalleRPV = (req, res) => {
    const {zona, oficina, placa} = req.query;
    let url = new URL(`${API_SUNARP}/WSServiceverDetalleRPVExtra`);
    url.searchParams.set('usuario', process.env.USER_SUNARP);
    url.searchParams.set('clave', process.env.PASS_SUNARP);
    url.searchParams.set('out', 'json');
    url.searchParams.set('zona', zona);
    url.searchParams.set('oficina', oficina);
    url.searchParams.set('placa', placa);
    console.log(url.searchParams);
    apiGetHttp(res, url);
}
const consultaDetalleRPVExtra = (req, res) => {
    const {zona, oficina, placa} = req.query;
    axios
        .get(`${API_SUNARP}/VerDetalleRPVExtra`, {
            params: {
                zona, oficina, placa, out: 'json'
            }
        })
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const consultaVerificador = (req, res) => {
    const {apPaterno, apMaterno, nombre} = req.query;
    axios
        .get(`${API_SUNARP}/Verificador`, {
            params: {
                apPaterno, apMaterno, nombre, out: 'json'
            }
        })
        .then(response => httpOk200Content(res, response.data, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

const apiGetHttp = (res, url) => {
    xhr.open('GET', url);
    // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log('ESTADO');
            console.log(xhr.status);
            httpError500(res, xhr.statusText)
        } else {
            httpOk200Content(res, JSON.parse(xhr.responseText), 'Consulta realizada correctamente.');
        }
    }
    xhr.onprogress = function(event) {
        console.log('EN PROGRESO')
        console.log(event)
    };
    xhr.onerror = function () {
        console.log('Error')
        console.log(xhr.statusText)
        httpError500(res, xhr.statusText)
    }
}

module.exports = {
    consultaNaveAeronave,
    consultaPJRazonSocial,
    consultaTitularidad,
    consultaOficinas,
    consultaAsientos,
    consultaAsiento,
    consultaDetalleRPV,
    consultaDetalleRPVExtra,
    consultaVerificador
}
