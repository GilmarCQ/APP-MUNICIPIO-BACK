const { Mascota, Persona, MascotaComportamiento, MascotaPropietario, Comportamiento, conexion } = require('../../config/Sequelize');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');
const { obtenerPdfFichaRegistro } = require('./MascotaDocumento');

const crearMascota = async (req, res) => {
    const { mascota, propietario, contacto, comportamientos } = req.body;
    const t = await conexion.transaction();
    try {
        mascota.registro = await getNumeroRegistro(res) + 1;
        const personaCreated = await findAddPropietario(propietario);
        const contactoCreated = await findAddPropietario(contacto);
        // const personaCreated = await Persona.build(propietario).save({transaction: t});
        // const contactoCreated = await Persona.build(contacto).save({transaction: t});
        const mascotaCreated = await Mascota.build(mascota).save({transaction: t});

        await agregarPropietario('P', mascotaCreated.id, personaCreated.id, t);
        await agregarPropietario('C', mascotaCreated.id, contactoCreated.id, t);

        for (let i=0 ; i < comportamientos.length ; i++) {
            const comportamientoMascotaCreated = setComportamientoMascota(res, mascotaCreated.id, comportamientos[i].id);
        }
        await t.commit();
        httpCreated201(res, mascotaCreated,
            'La mascota fue agregada correctamente, con número de registro ' +
            formatearDigitos(mascotaCreated.registro, 8));
    } catch (e) {
        console.log(e);
        httpError500(res, e);
        await t.rollback();
    }
};

const findAddPropietario = async (persona) => {
    var persona;
    await Persona.findOne(
        { where: { tipoDocumento: persona.tipoDocumento, numeroDocumento: persona.numeroDocumento } })
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
        .count()
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
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt', 'foto', 'propietarioMascota', 'edad',
                        'color', 'tamanio', 'sexo', 'raza', 'esterilizado', 'descripcion']
                }
            }
        ],
        attributes:[ 'id', 'tipoDocumento', 'numeroDocumento', 'nombres', 'apellidoPaterno', 'apellidoMaterno',
            'correo', 'telefono' ]
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
module.exports = {
    crearMascota, getMascotasByDocumento, getMascotasByRegistro, buscarFichaRegistro, convertirNumeroDigitos
}