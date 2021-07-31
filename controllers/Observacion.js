const { Observacion, MascotaObservacion } = require('../config/Sequelize');

const crearObservacion = (observacion, res) => {
    const observacionBuild = Observacion.build(observacion);
    return observacionBuild.save()
        .then(observacionCreated => observacionCreated)
        .catch(error => console.log(error));
};
const agregarObservacionMascota = (mascotaId, observacionId,t , res) => {
    const observacionMascota = { mascotaId, observacionId };
    const MOBuild = MascotaObservacion.build(observacionMascota);
    return MOBuild.save({transaction: t})
}


module.exports = {
    crearObservacion, agregarObservacionMascota
}