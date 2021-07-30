const { Usuario } = require('../config/Sequelize');
const jwt = require('jsonwebtoken');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../utils/httpMessages');

const login = async (req, res) => {
    try {
        const user = req.body;
        const userFinded = await findUserByUserName(user.usuario, res);
        if (userFinded) {
            if (await (userFinded.validarPassword(user.password))) {
                let token = await userFinded.generarJWT();
                    httpOk200Content(res,
                        {
                            "nombres": userFinded.nombres,
                            "apellidos": userFinded.apellidos,
                            "usuario": userFinded.usuario,
                            "usu_reniec": userFinded.usu_reniec,
                            "usu_pass": userFinded.pass_reniec,
                            "tipo": userFinded.tipo,
                            "token": token
                        }, 'Usuario logueado correctamente.')
            }
        }
        httpNotFound404(res, 'Usuario o contraseña no encontrado.')
    } catch (error) {
        httpError500(res, error)
    }
}

const tokenIsValid = (req, res, next) => {
    const {authorization} = req.headers;
    if (authorization) {
        jwt.verify(authorization, 'q@zWSX123456', { algorithm: 'RS256' },
            (err, user) => {
                if (err) {
                    console.log(err);
                    console.log('ERROR TOKEN');
                    httpBadRequest400(res, 'El token de sesión es inválido, vuelva a iniciar sesión.');
                }
                next();
            });
    } else {
        httpBadRequest400(res, 'El token de sesión es inválido, vuelva a iniciar sesión.');
    }
}

/**
 * Método que permite la creación de un usuario, valida que no exista otro usuario con el mismo nombre de usuario
 * @param req
 * @param res
 */
const createUser = async (req, res) => {
    const user = req.body;
    if (await isDuplicateUser(user.usuario, res))
        httpBadRequest400(res, 'El usuario ya existe, ingrese otro nombre de usuario.');
    const userBuild = Usuario.build(user);
    userBuild.setSaltAndHash(user.password);
    userBuild.save()
        .then(newUser => httpCreated201(res, newUser, 'El usuario fue creado correctamente.'))
        .catch(error => httpError500(res, error))
}

const updatePassword = (req, res) => {
    const user = req.body;
    Usuario.findOne({where: { id: user.id, usuario: user.usuario}})
        .then(userFind => {
            if (userFind) {
                if (userFind.validarPassword(user.password)) {
                    userFind.setSaltAndHash(user.passwordNuevo);
                    userFind.save()
                        .then(userUpdate =>
                            httpOk200NoContent(res, 'La contraseña del usuario fue actualizada correctamente.'))
                        .catch(error => httpError500(res, error))
                } else {
                    httpNotFound404(res, 'El usuario o password ingresados son incorrectos.')
                }
            } else {
                httpNotFound404(res, 'El usuario o password ingresados son incorrectos.')
            }
        })
        .catch(error => httpError500(res, error))
}

/**
 * Método que actualiza el nombre de usuario, valida que no se duplique el nombre de usuario
 * @param req
 * @param res
 */
const editUserName = async (req, res) => {
    try {
        const user = req.body;
        var userFind = await findUserById(user.id, res);
        if (userFind) {
            const userFindName = await findUserByUserName(user.usuario, res);
            if (userFindName) {
                if (userFind.id === userFindName.id) {
                    userFind.usuario = user.usuario;
                    userFind.save()
                        .then(userUpdate => httpOk200NoContent(res, 'Usuario actualizado correctamente.'))
                        .catch(error => httpError500(res, error))
                } else {
                    httpBadRequest400(res, 'El usuario ya existe, ingrese otro nombre de usuario.')
                }
            } else {
                userFind.usuario = user.usuario;
                userFind.save()
                    .then(userUpdate => httpOk200NoContent(res, 'Usuario actualizado correctamente.'))
                    .catch(error => httpError500(res, error))
            }
        } else {
            httpNotFound404(res,'El usuario a editar no fue encontrado.')
        }
    } catch (error) {
        httpError500(res, error);
    }

}

const deleteUser = async (req, res) => {
    const { id } = req.query;
    Usuario.findOne({where: {id}})
        .then(userFind => {
            if (userFind)
                userFind.destroy()
                    .then(userDelete => httpOk200NoContent(res, 'Usuario eliminado correctamente.'))
                    .catch(error => httpError500(res, error));
            httpNotFound404(res, 'El usuario no fue encontrado.');
        })
        .catch(error => httpError500(res, error))
}

const listUsers = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Usuario.findAndCountAll({
        where: {},
        offset: page * size,
        limit: size,
        order: [ [sort_by, order_by] ]
        })
        .then(users => {
            const data = getPagingData(users, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.')
        })
        .catch(error => httpError500(res, error))
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: usuarios } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, usuarios, totalPaginas, paginaActual };
}

/**
 * Método que valida if el usuario a nombre de usuario a buscar es duplicado
 * @param usuario
 * @param res
 * @returns {Promise<boolean|void>} : true => duplicado; false => no duplicado
 */
const isDuplicateUser = async (usuario, res) => {
    return await
        Usuario.findOne({where: {usuario}})
            .then(user => !!user)
            .catch(error => httpError500(res, error))
}

/**
 * Método que busca un usuario a partir del id del usuario
 * @param usuario
 * @param res
 * @returns {Promise<T|void>} : T=> usuario; null
 */
const findUserById = async (id, res) => {
    try {
        return await Usuario.findOne({where: {id}})
            .then(user => user)
            .catch(error => httpError500(res, error));
    } catch (error) {
        httpError500(res, error);
    }
}

/**
 * Método que busca un usuario a partir del nombre del usuario
 * @param usuario
 * @param res
 * @returns {Promise<T|void>} : T=> usuario; null
 */
const findUserByUserName = async (usuario, res) => {
    try {
        return await Usuario.findOne({where: {usuario}})
            .then(user => user)
            .catch(error => httpError500(res, error));
    } catch (error) {
        httpError500(res, error);
    }
}

module.exports = {
    createUser, editUserName, deleteUser, updatePassword, listUsers, login, tokenIsValid
}