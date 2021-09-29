const { Funcionario, Persona, Visita, Visitante, AreaFuncionario} = require('../../config/Sequelize');
const { findPersonaByDocumento, createPerson } = require('../../controllers/Persona');
const { findVisitanteById, createVisitante } = require('../../controllers/transparencia/Visitante');
const { httpError500, httpOk200NoContent, httpOk200Content, httpCreated201, httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');
const { REGISTRO_DUPLICADO, REGISTRO_CREADO, CONSULTA_SATISFACTORIA, REGISTRO_NO_ENCONTRADO, REGISTRO_ACTUALIZADO} =
    require('../../utils/apiMessages');
const { formatearFecha } = require('../../utils/utils');
const { Op } = require('sequelize');

const registrarVisita = async (req, res) => {
    const { visita } = req.body;
    const personFinded = await findPersonaByDocumento(visita.visitante.tipoDocumento.siglas, visita.visitante.numeroDocumento);
    if (personFinded) {
        const visitanteF = await findVisitanteById(personFinded.id);
        if (visitanteF) {
            visita.personaId = personFinded.id;
            visita.visitante.personaId = personFinded.id;
            visita.visitanteId = visitanteF.id;
        } else {
            visita.personaId = personFinded.id;
            visita.visitante.personaId = personFinded.id;
            const visitanteC = await createVisitante(visita.visitante);
            visita.visitanteId = visitanteC.id;
        }
    } else {
        const personC = await createPerson({
            tipoDocumento: visita.visitante.tipoDocumento.siglas,
            numeroDocumento: visita.visitante.numeroDocumento,
            apellidoMaterno: visita.apellidoMaterno,
            apellidoPaterno: visita.apellidoPaterno,
            nombres: visita.nombres
        });
        visita.visitante.personaId = personC.id;
        const visitanteC = await createVisitante(visita.visitante);
        visita.visitanteId = visitanteC.id;
    }
    const visitaBuild = Visita.build(visita);
    visitaBuild.save()
        .then(visitaRegistro => httpCreated201(res, visitaRegistro, REGISTRO_CREADO))
        .catch(error => {
            console.log(error);
            httpError500(res, error);
        });
}
const listarPendientesByPersona = async (req, res) => {
    const { numeroDocumento, tipoDocumento } = req.query;
    Visitante
        .findAll({
            attributes: ['personaId'],
            include: [
                {
                    model: Visita,
                    where: {
                        horaSalida: {
                            [Op.is]: null
                        }},
                    attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                    include: [
                        {
                            model: AreaFuncionario,
                            // attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                            attributes: ['cargo'],
                            include: [
                                {
                                    model: Funcionario,
                                    attributes: ['personaId'],
                                    include: [
                                        {
                                            model: Persona,
                                            attributes: [ "tipoDocumento", "numeroDocumento", "nombres", "apellidoPaterno", "apellidoMaterno" ],
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Persona,
                    where: { numeroDocumento, tipoDocumento },
                    attributes: [ "tipoDocumento", "numeroDocumento", "nombres", "apellidoPaterno", "apellidoMaterno" ],
                }
            ]

        })
        .then(registros => httpOk200Content(res, registros, CONSULTA_SATISFACTORIA))
        .catch(error => httpError500(res, error));
}
const actualizarHoraSalida = async (req, res) => {
    const { horaSalida, id } = req.body;
    console.log(horaSalida, id);
    const visitaFinded = await findVisitaById(id);
    if (visitaFinded) {
        visitaFinded.horaSalida = horaSalida;
        visitaFinded.save()
            .then(visita => httpOk200NoContent(res, REGISTRO_ACTUALIZADO))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, REGISTRO_NO_ENCONTRADO);
    }
}
const paginarVisitasPendientes = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Visitante
        .findAndCountAll({
            attributes: ['personaId'],
            include: [
                {
                    model: Visita,
                    attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                    where: {
                        horaSalida: {
                            [Op.is]: null
                        }},
                    include: [
                        {
                            model: AreaFuncionario,
                            // attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                            attributes: ['cargo'],
                            include: [
                                {
                                    model: Funcionario,
                                    attributes: ['personaId'],
                                    include: [
                                        {
                                            model: Persona,
                                            attributes: [ "tipoDocumento", "numeroDocumento", "nombres", "apellidoPaterno", "apellidoMaterno" ],
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Persona,
                    attributes: [ "tipoDocumento", "numeroDocumento", "nombres", "apellidoPaterno", "apellidoMaterno" ],
                }
                ],
            offset: page * size,
            limit: size,
        })
        .then(visitas => {
            const data = getPagingData(visitas, page, size);
            httpOk200Content(res, data, CONSULTA_SATISFACTORIA);
        })
        .catch(error => httpError500(res, error));
}
const paginarVisitas = (req, res) => {
    const { order_by, sort_by, page, size, fecha } = req.query;
    const fechaBase = `${formatearFecha(fecha)} 00:00:01` ;
    const fechaMax = `${formatearFecha(fecha)} 23:59:59` ;
    console.log(fecha);
    Visitante
        .findAndCountAll({
            attributes: ['personaId'],
            include: [
                {
                    model: Visita,
                    attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                    where: {
                        fecha: {
                            [Op.between]: [fechaBase, fechaMax]
                        },
                        horaIngreso: {
                            [Op.not]: null
                        },
                        horaSalida: {
                            [Op.not]: null
                        }},
                    include: [
                        {
                            model: AreaFuncionario,
                            attributes: ['cargo'],
                            include: [
                                {
                                    model: Funcionario,
                                    attributes: ['personaId'],
                                    include: [
                                        {
                                            model: Persona,
                                            attributes: [ "tipoDocumento", "numeroDocumento", "nombres", "apellidoPaterno", "apellidoMaterno" ],
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Persona,
                    attributes: [ "tipoDocumento", "numeroDocumento", "nombres", "apellidoPaterno", "apellidoMaterno" ],
                }
            ],
            offset: page * size,
            limit: size,
        })
        .then(visitas => {
            const data = getPagingData(visitas, page, size);
            httpOk200Content(res, data, CONSULTA_SATISFACTORIA);
        })
        .catch(error => httpError500(res, error));
}

const findVisitaById = async (id) => {
    return Visita.findOne({ where: { id } })
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}

module.exports = {
    registrarVisita, listarPendientesByPersona, actualizarHoraSalida, paginarVisitasPendientes, paginarVisitas
}