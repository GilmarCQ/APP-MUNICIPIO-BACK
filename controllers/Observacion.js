const { Observacion, MascotaObservacion } = require('../config/Sequelize');

const crearObservacion = (observacion, res) => {
    var observacionReturn;
    const observacionBuild = Observacion.build(observacion);
    Observacion.save()
        .then(observacionCreated => observacionReturn = observacionCreated)
        .catch(error => console.log(error));
    return observacionBuild
};
const agregarObservacionMascota = (mascotaId, observacionId,t , res) => {
    const observacionMascota = { mascotaId, observacionId };
    const MOBuild = MascotaObservacion.build(observacionMascota);
    return MascotaObservacion.save({transaction: t})
}


module.exports = {
    crearObservacion, agregarObservacionMascota
}