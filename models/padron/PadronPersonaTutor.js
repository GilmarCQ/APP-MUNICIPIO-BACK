const sequelize = require('sequelize');

const padronPersonaTutor_model = (conexion) => {
    return conexion.define('padronPersonaTutor',
        {
            id: {
                type: sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false },
            personaTutorId: {
                type: sequelize.INTEGER,
                allowNull: false },
            padronPersonaId: {
                type: sequelize.INTEGER,
                allowNull: false }
        },
        {
            tableName: 'padronPersonaTutor',
            paranoid: true,
            timestamps: true
        });
}

module.exports = padronPersonaTutor_model;
