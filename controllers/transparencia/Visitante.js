const {Visitante, Persona} = require("../../config/Sequelize");

const createVisitante = async (visitante) => {
    let visitanteV;
    visitante.id = null;
    const visitanteB = Visitante.build(visitante);
    await visitanteB.save()
        .then(visitanteC => visitanteV = visitanteC);
    return visitanteV;
}

const findVisitanteById = (id) => {
    return Visitante.findOne({ where: { personaId: id } })
}

module.exports = { findVisitanteById, createVisitante }