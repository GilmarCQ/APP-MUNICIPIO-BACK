const sequelize = require('sequelize');

const padron_model = (conexion) => {
    return conexion.define('padron',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false },
            correo: {
                type: sequelize.TEXT,
                allowNull: false },
            pass: {
                type: sequelize.TEXT,
                allowNull: false },
            host: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'padron',
            timestamps: true,
            paranoid: true
        });
}
module.exports = padron_model;
