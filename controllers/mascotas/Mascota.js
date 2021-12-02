const { Mascota, Persona, MascotaComportamiento, MascotaPropietario, Comportamiento,
    Observacion, conexion } = require('../../config/Sequelize');
const { crearObservacion, agregarObservacionMascota } = require('../Observacion');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');
const { obtenerPdfFichaRegistro } = require('./MascotaDocumento');
const {REGISTRO_ACTUALIZADO, REGISTRO_NO_ENCONTRADO} = require("../../utils/apiMessages");
const crearMascota = async (req, res) => {
    const { mascota, propietario, comportamientos } = req.body;
    const t = await conexion.transaction();
    try {
        // mascota.registro = await getNumeroRegistro(res) + 1;
        const personaCreated = await findAddPropietario(propietario);
        // const contactoCreated = await findAddPropietario(contacto);
        // const personaCreated = await Persona.build(propietario).save({transaction: t});
        // const contactoCreated = await Persona.build(contacto).save({transaction: t});
        const mascotaCreated = await Mascota.build(mascota).save({transaction: t});

        await agregarPropietario('P', mascotaCreated.id, personaCreated.id, t);
        // await agregarPropietario('C', mascotaCreated.id, contactoCreated.id, t);

        for (let i=0 ; i < comportamientos.length ; i++) {
            const comportamientoMascotaCreated = setComportamientoMascota(res, mascotaCreated.id, comportamientos[i].id);
        }
        await t.commit();
        httpCreated201(res, mascotaCreated,
            'La mascota fue agregada correctamente');
    } catch (e) {
        console.log(e);
        httpError500(res, e);
        await t.rollback();
    }
};
const findAddPropietario = async (persona) => {
    var persona;
    await Persona.findOne(
        { where: { tipoDocumento: persona.tipoDocumento, numeroDocumento: persona.numeroDocumento.toString() } })
        .then(personaFind => {
            if (!personaFind) {
                let personaBuild = Persona.build(persona);
                let personaCreated = personaBuild.save()
                    .then(personaSave => { return personaSave })
                persona = personaCreated;
            } else {
                persona = personaFind;
            }
        });
    return persona;

}
const setComportamientoMascota = async (res, mascotaId, comportamientoId) => {
    const comportamientoMascota = { mascotaId, comportamientoId };
    const comportaminetoMascotaBuild = MascotaComportamiento.build(comportamientoMascota);
    return comportaminetoMascotaBuild.save();
}
const getNumeroRegistro = async (res) => {
    var numeroRegistros;
    await Mascota
        .count({
            where: { estadoRegistro: 'APROBADO' }
        })
        .then(registros => numeroRegistros = registros);
    return numeroRegistros;
}
const agregarPropietario = (tipo, mascotaId, personaId, t) => {
    const propietario = { tipo, mascotaId, personaId };
    const propietarioBuild = MascotaPropietario.build(propietario);
    return propietarioBuild.save({transaction: t});
}
const formatearDigitos = (numero, numeroDigitos) => {
    let numeroCadena = numero.toString();
    var cadena = numeroCadena;
    for (let indice = numeroCadena.length; indice < numeroDigitos; indice++) {
        cadena = '0' + cadena;
    }
    return cadena;
}
const getMascotasByDocumento = (req, res) => {
    const { numeroDocumento, tipoDocumento } = req.query;
    Persona.findOne({
        where: { tipoDocumento, numeroDocumento },
        include: [
            {
                model: Mascota,
                attributes: ['registro', 'fechaRegistro', 'estadoRegistro']
            }
        ],
        attributes:[ 'id', 'tipoDocumento', 'numeroDocumento', 'nombres', 'apellidoPaterno', 'apellidoMaterno']
    })
        .then(personas => {
            (personas) ?
                httpOk200Content(res, personas, 'Consulta exitosa.'):
                httpNotFound404(res,
                    `No se encontraron resultados de la persona con ${tipoDocumento} ${numeroDocumento}`);

        })
        .catch(error => httpError500(res, error));
}
const getMascotasByRegistro = async (req, res) => {
    const { registro } = req.query;
    Mascota.findAll({
        where: { registro },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
    })
        .then(mascota => {
                httpOk200Content(res, mascota, 'Consulta exitosa.');
        })
        .catch(error => {
            console.log(error);
            httpError500(res, error);
        });
}
const getMascotasByEstado = (req, res) => {
    const { order_by, sort_by, page, size, estadoRegistro } = req.query;
    Mascota.findAndCountAll({
            where: { estadoRegistro },
            attributes: ['id', 'nombre', 'fechaRegistro', 'estadoRegistro', 'registro'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(mascotas => {
            const data = getPagingData(mascotas, page, size);
            httpOk200Content(res, data, 'Consulta Exitosa');
        })
        .catch(error => httpError500(res, error));
}
const getMascotaById = (req, res) => {
    const { id } = req.query;
    Mascota
        .findOne({
            where: { id },
            include: [
                {
                    model: Persona,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'foto', 'propietarioMascota',
                            'color', 'tamanio', 'sexo', 'raza', 'esterilizado', 'descripcion']}
                },
                {
                    model: Observacion,
                    as: 'observaciones',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'deletedAt']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }})
        .then(mascota => {
            httpOk200Content(res, mascota, 'Consulta Exitosa')
        })
        .catch(error => {
            console.log(error);
            httpError500(res, error);
        })
}
const aprobarMascotaById = (req, res) => {
    const {id} = req.body;
    Mascota.findByPk(id)
        .then(async mascota => {
            if (mascota) {
                mascota.estadoRegistro = 'APROBADO';
                mascota.registro = await getNumeroRegistro(res) + 1;
                mascota.save()
                    .then(mascotaAprobado => httpOk200NoContent(res, 'El registro se aprobo correctamente.'))
                    .catch(error => httpError500(res, error));
            } else {
                httpNotFound404(res, `El registro con id ${id} no se encontro.`);
            }
        })
        .catch(error => httpError500(res, error));
}
const subsanarObservacionById = async (req, res) => {
    const { id } = req.query;
    const observacionFinded = await findObservacionById(id, res);
    if (observacionFinded) {
        observacionFinded.estadoSubsanacion = 'SUBSANADO';
        observacionFinded.save()
            .then(observacionUpdated => httpOk200NoContent(res, REGISTRO_ACTUALIZADO))
            .catch(error => httpError500(res, error));
    } else {
        httpNotFound404(res, REGISTRO_NO_ENCONTRADO);
    }
}
const findObservacionById = async (id, res) => {
    let observacionFinded;
    await Observacion.findOne({ where: { id } })
        .then(observacion => observacionFinded = observacion);
    return observacionFinded;
}
const observarMascotaById = async (req, res) => {
    const { id, observaciones } = req.body;
    const t = await conexion.transaction();
    try {
        const mascota = await Mascota
            .findOne({where: { id }})
            .then(async mascota => mascota)
            .catch(async error => {
                await t.rollback();
                httpError500(res, error);
            })
        if (mascota) {
            for(let i = 0 ; i < observaciones.length ; i++) {
                const observacion = await crearObservacion(observaciones[i], res);
                await agregarObservacionMascota(id, observacion.id, t, res);
            }
            mascota.estadoRegistro = 'OBSERVADO';
            mascota.save()
                .then(async mascotaObservada => {
                    await t.commit();
                    httpOk200NoContent(res, 'El registro fue observado correctamente.');
                })
                .catch(async error => {
                    await t.rollback();
                    httpError500(res, error);
                });
        }
    } catch (e) {
        await t.rollback();
        httpError500(res, error);
    }
    // console.log(id, observaciones);
}
const buscarFichaRegistro = async (req, res) => {
    const { registro } = req.query;
    const respuesta = await buscarMascotaRegistro(res, registro);
    const comportamientosMascota = await buscarComportamientosMascota(res, registro);
    await obtenerPdfFichaRegistro(res, respuesta, convertirNumeroDigitos(registro, 8), enumerarComportamiento(comportamientosMascota));
}
const convertirNumeroDigitos = (numero, numeroDigitos) => {
    let numeroCadena = numero.toString();
    var cadena = numeroCadena;
    for (let indice = numeroCadena.length; indice < numeroDigitos; indice++) {
        cadena = '0' + cadena;
    }
    return cadena;
}
const enumerarComportamiento = (comportamientos) => {
    var comportamientosLista = Array.from(comportamientos, x => x.nombre);
    return comportamientosLista;
}
const buscarMascotaRegistro = async (res, numeroRegistro) => {
    var respuesta;
    await Mascota.findOne({
        where: { registro: numeroRegistro },
        include: [
            {
                model: Persona,
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'especie']
        }
    })
        .then(mascotas => respuesta = mascotas)
        .catch(error => res.status(500).json(error));
    return respuesta;
}
const buscarComportamientosMascota = async (res, numeroRegistro) => {
    var comportamientos;
    await Mascota.findOne({
        where: { registro: numeroRegistro },
        include: [
            {
                model: Comportamiento,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'estado']
                }
            }
        ],
        attributes: ['id', 'nombre']
    })
        .then(comportamientosMascota => {
            comportamientos = comportamientosMascota.comportamientos;
        })
        .catch(error => res.status(500).json(error))
    return comportamientos;
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}

module.exports = {
    crearMascota, getMascotasByDocumento, getMascotasByRegistro, getMascotaById, observarMascotaById,
    buscarFichaRegistro, convertirNumeroDigitos, getMascotasByEstado, aprobarMascotaById, subsanarObservacionById
}