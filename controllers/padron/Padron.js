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
const buscarReportePadronBeneficiariosPorIdPadron = async (req, res) => {
    const { id, zona, tipoBeneficiario } = req.query;
    console.log(id, zona, tipoBeneficiario);
    const padronEncontrado = await findPadronById(id);
    var padronBeneficiarios;
    try {
        if (padronEncontrado) {
            if (zona === '') {
                if (tipoBeneficiario === '') {
                    console.log('-----------------CONTADOR----------------');
                    padronBeneficiarios = await contarPadronBeneficiariosPorId(id);
                    console.log(padronBeneficiarios);
                } else {
                    padronBeneficiarios = await findPadronBeneficiariosPorIdPorTipoBeneficiario(id, tipoBeneficiario);
                }
            } else {
                if (tipoBeneficiario === '') {
                    padronBeneficiarios = await contarPadronBeneficiariosPorIdPorZona(id, zona);
                } else {
                    padronBeneficiarios =
                        await findPadronBeneficiariosPorIdPorTipoBeneficiarioYZona(id, tipoBeneficiario, zona);
                }
            }
            httpOk200Content(res, padronBeneficiarios, CONSULTA_SATISFACTORIA);
        } else {
            httpNotFound404(res, REGISTRO_NO_ENCONTRADO);
        }
    } catch (e) {
        httpError500(res, e);
    }
}
const buscarPadronBeneficiariosPorIdPadron = async (req, res) => {
    const { id, zona, tipoBeneficiario } = req.query;
    console.log(id, zona, tipoBeneficiario);
    const padronEncontrado = await findPadronById(id);
    var padronBeneficiarios;
    try {
        if (padronEncontrado) {
            if (zona === '') {
                if (tipoBeneficiario === '') {
                    padronBeneficiarios = await findPadronBeneficiariosPorId(id);
                } else {
                    padronBeneficiarios = await findPadronBeneficiariosPorIdPorTipoBeneficiario(id, tipoBeneficiario);
                }
            } else {
                if (tipoBeneficiario === '') {
                    padronBeneficiarios = await findPadronBeneficiariosPorIdPorZona(id, zona);
                } else {
                    padronBeneficiarios =
                        await findPadronBeneficiariosPorIdPorTipoBeneficiarioYZona(id, tipoBeneficiario, zona);
                }
            }
            httpOk200Content(res, padronBeneficiarios, CONSULTA_SATISFACTORIA);
        } else {
            httpNotFound404(res, REGISTRO_NO_ENCONTRADO);
        }
    } catch (e) {
        httpError500(res, e);
    }
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
const findPadronById = (id) => {
    return Padron.findOne({ where: { id } });
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
const findPadronBeneficiariosPorId = (id) => {
    return Padron
        .findOne({
            where: { id },
            attributes: ['id', 'nombre'],
            include: [
                {
                    model: Persona,
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
            ]
        });
}
const findPadronBeneficiariosPorIdPorZona = (id, zona) => {
    return Padron
        .findOne({
            where: { id },
            attributes: ['id', 'nombre'],
            include: [
                {
                    model: Persona,
                    where: { zona },
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
            ]
        });
}
const findPadronBeneficiariosPorIdPorTipoBeneficiarioYZona = (id, tipoBeneficiario, zona) => {
    console.log('ZONA TIPO');
    return Padron
        .findOne({
            where: { id },
            attributes: ['id', 'nombre'],
            include: [
                {
                    model: Persona,
                    where: { zona },
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
                    ],
                    through: {
                        model: PadronPersona,
                        where: { tipoEmpadronado: tipoBeneficiario },
                        attributes: [ 'fechaRegistro', 'tipoEmpadronado', 'usuario' ]
                    }
                }
            ]
        });
}
const findPadronBeneficiariosPorIdPorTipoBeneficiario = (id, tipoBeneficiario) => {
    return Padron
        .findOne({
            where: { id },
            attributes: ['id', 'nombre'],
            include: [
                {
                    model: Persona,
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
                    ],
                    through: {
                        model: PadronPersona,
                        where: { tipoEmpadronado: tipoBeneficiario },
                        attributes: [ 'fechaRegistro', 'tipoEmpadronado', 'usuario' ]
                    }
                }
            ]
        });
}

const contarPadronBeneficiariosPorId = (id) => {
    let padronFinal;
    Persona
        .count({
            group: 'zona',
            order: ['zona'],
            attributes: ['zona'],
            include: [
                {
                    model: Padron,
                    where: { id },
                    through: {
                        model: PadronPersona,
                        attributes: []
                    }
                }
            ]
        })
        .then(contenido => {
            Persona.count({
                include: [
                    {
                        model: Padron,
                        where: { id },
                        through: {
                            model: PadronPersona,
                            attributes: []
                        }
                    }
                ]
            })
                .then(total => {
                    padronFinal = {
                        total,
                        lista: contenido
                    };
                    console.log(padronFinal);
                    return padronFinal;
                });
        });
    return padronFinal;
}

module.exports = {
    crearPadron, paginarPadrones, buscarPadronPorId, agregarBeneficiario,
    buscarPersonaPorDocumentoPorIdPadron, buscarPadronBeneficiariosPorIdPadron,
    buscarReportePadronBeneficiariosPorIdPadron
}
