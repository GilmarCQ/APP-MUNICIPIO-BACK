const { Persona } = require('../config/Sequelize');

const createPerson = async (persona) => {
    let personaV;
    persona.id = null;
    const personaB = Persona.build(persona);
    await personaB.save()
        .then(personaC => personaV = personaC);
    return personaV;
}

const findPersonaByDocumento = (tipoDocumento, numeroDocumento) => {
    return Persona.findOne({ where: { tipoDocumento, numeroDocumento } })
}

module.exports = {
    findPersonaByDocumento, createPerson
}
