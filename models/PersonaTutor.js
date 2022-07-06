const sequelize = require('sequelize');

const personaTutor_model = (conexion) => {
    return conexion.define('personaTutor',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            tutorId: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            personaId: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            tipoTutor: {
                type: sequelize.STRING,
                allowNull: false
            },
            usuario: {
                type: sequelize.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'personaTutor',
            paranoid: true,
            timestamps: true
        });
}
module.exports = personaTutor_model;
