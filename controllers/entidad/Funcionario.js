const { Funcionario, Persona} = require('../../config/Sequelize');
const { findPersonaByDocumento, createPerson } = require('../../controllers/Persona');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');
const {Op} = require("sequelize");

const crearFuncionario = async (req, res) => {
    const {funcionario} = req.body;
    console.log(funcionario);
    const funcionarioFinded =
        await findFuncionarioByDocumento(funcionario.persona.tipoDocumento, funcionario.persona.numeroDocumento);
    if (funcionarioFinded) {
        httpBadRequest400(res, 'El funcionario ya existe.');
    } else {
        const personaF =
            await findPersonaByDocumento(funcionario.persona.tipoDocumento, funcionario.persona.numeroDocumento);
        if (personaF) {
            const funcionarioBuild = Funcionario.build({
                personaId: personaF.id,
                contrato: funcionario.contrato,
                fechaContrato: funcionario.fechaContrato});
            funcionarioBuild.save()
                .then(funcionarioC => httpCreated201(res, funcionarioC, 'Registro agregado correctamente.'));
        } else {
            const personaC = await createPerson(funcionario.persona);
            funcionario.personaId = personaC.id;
            funcionarioB = Funcionario.build(funcionario);
            funcionarioB.save()
                .then(funcionarioCr => httpCreated201(res, funcionarioCr, 'Registro Agregado Correctamente.'))
                .catch(error => httpError500(res, error));
        }
    }
}
const buscarFuncionarioPorId = (req, res) => {
    const { id } = req.query;
    Funcionario
        .findOne({
            where: {id},
            attributes: ['id', 'nombre']
        })
        .then(funcionarioFinded => httpOk200Content(res, funcionarioFinded, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}
const paginarFuncionarios = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Funcionario
        .findAndCountAll({
            include: [{
                model: Persona,
                attributes: {
                    exclude: [ "createdAt", "updatedAt", "deletedAt" ]
                }
            }],
            attributes: {
                exclude: [ "createdAt", "updatedAt", "deletedAt" ]
            },
            order: [
                [{model: Persona}, sort_by, order_by]
            ],
            offset: page * size,
            limit: size,
        })
        .then(funcionarios => {
            const data = getPagingData(funcionarios, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const editarFuncionario = async (req, res) => {
    const { funcionario } = req.body;
    console.log(funcionario);
    const funcionarioFinded = await findFuncionarioById(funcionario.id, res);
    if (funcionarioFinded) {
        funcionarioFinded.nombre = funcionario.nombre.toUpperCase();
        funcionarioFinded
            .save(funcionarioFinded)
            .then(funcionarioEdited => httpOk200NoContent(res, 'Acción realizada correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const eliminarFuncionario = async (req, res) => {
    const { id } = req.query;
    const funcionarioFinded = await findFuncionarioById(id, res);
    if (funcionarioFinded) {
        Funcionario
            .destroy({ where: { id: funcionarioFinded.id } })
            .then(funcionarioDeleted => httpOk200NoContent(res, 'Registro eliminado correctamente.'))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, 'Registro no encontrado.')
    }
}
const filtrarFuncionarios = async (req, res) => {
    const { order_by, sort_by, page, size, nombre } = req.query;
    Funcionario
        .findAndCountAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${nombre.toUpperCase()}%`
                }
            },
            attributes: ['id', 'nombre'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(funcioarios => {
            const data = getPagingData(funcioarios, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const listarFuncionarios = (req, res) => {
    Funcionario.findAll({
        include: [{
            model: Persona,
            attributes: {
                exclude: [ "createdAt", "updatedAt", "deletedAt" ]
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    })
        .then(funcioarios => httpOk200Content(res, funcioarios, 'Consulta Realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

const findFuncionarioByDocumento = async (tipoDocumento, numeroDocumento) => {
    let funcionario;
    await Funcionario
        .findOne({
            include: {
                model: Persona,
                where: {numeroDocumento, tipoDocumento },
            }
        })
        .then(funcionarioF => funcionario = funcionarioF)
        .catch(error => console.log(error));
    return funcionario;
}
const findFuncionarioByName = (nombre, res) => {
    return Funcionario.findOne({ where: { nombre } });
}
const findFuncionarioById = (id, res) => {
    return Funcionario.findOne({ where: { id } });
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
module.exports = {
    crearFuncionario, paginarFuncionarios, eliminarFuncionario, listarFuncionarios, findFuncionarioById
}
