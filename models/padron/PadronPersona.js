const sequelize = require('sequelize');
const {NOW} = require('sequelize');

const padronPersona_model = (conexion) => {
    return conexion.define('padronPersona',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            tipoEmpadronado: {
                type: sequelize.STRING,
                allowNull: false
            },
            fechaRegistro: {
                type: sequelize.DATE,
                allowNull: true,
                defaultValue: NOW
            }
        },
        {
            tableName: 'padronPersona',
            timestamps: true,
            paranoid: true
        });
}

module.exports = padronPersona_model;
