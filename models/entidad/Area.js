const sequelize = require('sequelize');

const area_model = (conexion) => {
    return conexion.define('area',
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false },
            abreviatura: {
                type: sequelize.TEXT,
                allowNull: false },
            nivel: {
                type: sequelize.INTEGER,
                allowNull: false }
        },
        {
            tableName: 'area',
            paranoid: true,
            timestamps: true
        });
}
module.exports = area_model;
