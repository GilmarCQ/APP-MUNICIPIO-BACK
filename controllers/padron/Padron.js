const { Padron, PadronPersona, Persona } = require('../../config/Sequelize');
const { findPersonaByDocumento, createPerson, updatePerson } = require('../../controllers/Persona');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400, httpError400
} = require('../../utils/httpMessages');
const { REGISTRO_DUPLICADO, REGISTRO_CREADO, REGISTRO_NO_ENCONTRADO, CONSULTA_SATISFACTORIA } = require('../../utils/apiMessages');

const crearPadron = async (req, res) => {
    const padron = req.body;
    const padronFinded = await findPadronByName(padron.nombre);
    if (padronFinded) {
        httpBadRequest400(res, REGISTRO_DUPLICADO);
    } else {
        const padronBuild = Padron.build(padron);
        padronBuild
            .save()
            .then(padronCreado => httpOk200NoContent(res, REGISTRO_CREADO))
            .catch(error => httpError500(res, error));
    }
}
const paginarPadrones = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Padron
        .findAndCountAll({
            where: {},
            attributes: ['id', 'nombre'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(padrones => {
            const data = getPagingData(padrones, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const buscarPadronPorId = (req, res) => {
    const { id } = req.query;
    Padron
        .findByPk(id, {
            attributes: ['id', 'nombre']
        })
        .then(padron => {
            if (padron) {
                httpOk200Content(res, padron, CONSULTA_SATISFACTORIA)
            } else {
                httpNotFound404(res, REGISTRO_NO_ENCONTRADO)
            }
        })
        .catch(error => httpError500(res, error));
}
const buscarPersonaPorDocumentoPorIdPadron = async (req, res) => {
    const { idPadron, numeroDocumento, tipoDocumento } = req.query;
    Padron
        .findOne({
            where: { id: idPadron },
            attributes: ['id', 'nombre'],
            include: {
                model: Persona,
                where: { tipoDocumento, numeroDocumento },
                attributes: [
                    'id',
                    'tipoDocumento',
                    'numeroDocumento',
                    'apellidoPaterno',
                    'apellidoMaterno',
                    'nombres',
                    'direccion',
                    'zona',
                    'manzana',
                    'lote',
                    'edad',
                    'genero',
                    'telefono'
                ]
            }
        })
        .then(response => {
            if (response) {
                httpOk200Content(res, response, CONSULTA_SATISFACTORIA);
            } else {
                httpNotFound404(res, REGISTRO_NO_ENCONTRADO);
            }
        })
        .catch(error => httpError500(res, error));
}
const agregarBeneficiario = async (req, res) => {
    const persona = req.body;
    const { padronId } = req.body;
    const { usuario } = req.headers;
    persona.usuario = usuario;

    try {
        const padronPersonaFinded = await findPersonaPadron(persona.tipoDocumento, persona.numeroDocumento, padronId);
        if (padronPersonaFinded) {
            httpBadRequest400(res, 'La persona ya se encuentra registrada en el padron.')
        } else {
            let personaFindedCreated = await findPersonaByDocumento(persona.tipoDocumento, persona.numeroDocumento);
            if (!personaFindedCreated) {
                personaFindedCreated = await createPerson(persona);
            } else {
                personaFindedCreated = await updatePerson(persona, personaFindedCreated);
            }
            const padronPersona = {
                padronId,
                personaId: personaFindedCreated.id,
                tipoEmpadronado: persona.tipoBeneficiario,
                usuario
            };
            const padronPersonaBuild = PadronPersona.build(padronPersona);
            padronPersonaBuild
                .save()
                .then( padronPersonaCreated => httpOk200NoContent(res, REGISTRO_CREADO) )
                .catch( error => httpError500(res, error) );
        }
    } catch (e) {
        httpError500(res, e)
    }
}

const findPersonaPadron = (tipoDocumento, numeroDocumento, idPadron) => {
    return Persona.findOne({
        where: { tipoDocumento, numeroDocumento },
        include: [
            {
                model: Padron,
                where: { id: idPadron }
            }
        ]
    });
}

const findPadronByName = (nombre) => {
    return Padron.findOne({ where: { nombre } });
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
module.exports = {
    crearPadron, paginarPadrones, buscarPadronPorId, agregarBeneficiario, buscarPersonaPorDocumentoPorIdPadron
}
