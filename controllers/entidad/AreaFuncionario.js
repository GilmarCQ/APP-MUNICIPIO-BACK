const { AreaFuncionario, Funcionario, Persona, Area} = require('../../config/Sequelize');
const { findFuncionarioById } = require('../entidad/Funcionario');
const { buscarAreaPorId } = require('../entidad/Area');
const { httpError500, httpOk200NoContent, httpOk200Content,
    httpCreated201, httpNotFound404, httpBadRequest400 } = require('../../utils/httpMessages');
const { REGISTRO_DUPLICADO, REGISTRO_CREADO, CONSULTA_SATISFACTORIA} = require('../../utils/apiMessages');

const crearCargo = (req, res) => {
    const { cargoFuncionario } = req.body;
    const cargoFuncionarioBuild = AreaFuncionario.build(cargoFuncionario);
    cargoFuncionarioBuild.save()
        .then(cargoFuncionarioC => httpCreated201(res, cargoFuncionarioC, REGISTRO_CREADO))
        .catch(error => httpError500(res => error));
}

const paginarCargosFuncionarios = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Area
        .findAndCountAll({
            include: [
                {
                    model: Funcionario,
                    required: true,
                    attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                    through: {
                        attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                    },
                    include: [
                        {
                            model: Persona,
                            // required: true,
                            attributes: [ "id", "nombres", "apellidoPaterno", "apellidoMaterno" ],
                            order: [
                                [{model: Persona}, sort_by, order_by]
                            ],
                        },
                    ],

                }
            ],
            attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
            offset: page * size,
            limit: size,
        })
        .then(funcionarios => {
            const data = getPagingData(funcionarios, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => {
            httpError500(res, error);
            console.log(error);
        });
}
const listarCargosFuncionarios = (req, res) => {
    AreaFuncionario
        .findAll({
            include: [
                {
                    model: Area,
                    attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                },
                {
                    model: Funcionario,
                    attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] },
                    include: [
                        {
                            model: Persona,
                            attributes: [ "nombres", "apellidoPaterno", "apellidoMaterno" ],
                        }
                    ]
                }
            ],
            attributes: { exclude: [ "createdAt", "updatedAt", "deletedAt" ] }
        })
        .then(funcionarios => {
            httpOk200Content(res, funcionarios, 'Consulta realizada correctamente.');
        })
        .catch(error => {
            console.log(error);
            httpError500(res, error);
        });
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}

const findCargo = async (areaId, funcionarioId) => {
    let cargo;
    await AreaFuncionario.findOne({ where: {areaId, funcionarioId} })
        .then(funcionarioCargo => cargo = funcionarioCargo);
    return cargo
}

module.exports = {
    findCargo, crearCargo, paginarCargosFuncionarios, listarCargosFuncionarios
}