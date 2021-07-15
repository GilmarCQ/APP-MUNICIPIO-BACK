const sequelize = require('sequelize');

const tipoDocumento_model = (conexion) => {
    return conexion.define('tipoDocumento',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false },
            siglas: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'tipoDocumento',
            timestamps: true,
            paranoid: true
        })
}
module.exports = tipoDocumento_model;