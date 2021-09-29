const sequelize = require('sequelize');

const sede_model = (conexion) => {
    return conexion.define('sede',
        {
            id: {
                primaryKey: true,
                timestamps: true,
                type: sequelize.INTEGER,
                allowNull: true },
            nombre: {
                type: sequelize.TEXT,
                allowNull: true },
            descripcion: { type: sequelize.TEXT },
            direccion: { type: sequelize.TEXT }
        },
        {
            tableName: 'sede',
            timestamps: true,
            paranoid: true
        })
}
module.exports = sede_model;

