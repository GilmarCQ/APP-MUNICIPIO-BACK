const sequelize = require('sequelize');

const tipoNotificacion_model = conexion => {
    return conexion.define('',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'tipoNotificacion',
            timestamps: true,
            paranoid: true
        })
}
module.exports = tipoNotificacion_model;