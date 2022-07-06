const { Persona } = require('../config/Sequelize');

const createPerson = async (persona) => {
    let personaV;
    persona.id = null;
    const personaB = Persona.build(persona);
    await personaB.save()
        .then(personaC => personaV = personaC);
    return personaV;
}
const updatePerson = async (persona, personaFinded) => {
    if (personaFinded) {
        let personaV;
        if (persona.genero !== '')  personaFinded.genero = persona.genero;
        if (persona.edad !== '')  personaFinded.edad = persona.edad;
        if (persona.telefono !== '')  personaFinded.telefono = persona.telefono;
        if (persona.zona !== '')  personaFinded.zona = persona.zona;
        if (persona.manzana !== '')  personaFinded.manzana = persona.manzana;
        if (persona.lote !== '')  personaFinded.lote = persona.lote;
        if (persona.direccion !== '')  personaFinded.direccion = persona.direccion;
        if (persona.usuario !== '')  personaFinded.usuario = persona.usuario;
        await personaFinded.save()
            .then(personaC => personaV = personaC);
        return personaV;
    }
    return personaFinded;
}
/*
* Busca si la persona existe en la base de datos a partir del Tipo y Número de Documento
* */
const findPersonaByDocumento = (tipoDocumento, numeroDocumento) => {
    return Persona.findOne({ where: { tipoDocumento, numeroDocumento } })
}

module.exports = {
    findPersonaByDocumento, createPerson, updatePerson
}
