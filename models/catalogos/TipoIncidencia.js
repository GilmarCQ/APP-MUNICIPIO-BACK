const sequelize = require('sequelize');

const tipoIncidencia_model = (conexion) => {
    return conexion.define('tipoIncidencia',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull:false
            },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'tipoIncidencia',
            timestamps: true,
            paranoid: true
        })
}
module.exports = tipoIncidencia_model;