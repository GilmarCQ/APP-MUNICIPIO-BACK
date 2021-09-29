const sequelize = require('sequelize');

const visitas_model = (conexion) => {
    return conexion.define('visitas',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            fecha: {
                type: sequelize.DATE,
                allowNull: false },
            horaIngreso: {
                type: sequelize.TIME,
                allowNull: false },
            horaSalida: {
                type: sequelize.TIME},
            motivo: {
                type: sequelize.TEXT,
                allowNull: false },
            entidadVisitante: {
                type: sequelize.TEXT,
                allowNull: false },
            observacion: {
                type: sequelize.TEXT,
                allowNull: true }
        },
        {
            tableName: 'visita',
            timestamps: true,
            paranoid: true
        });
}

module.exports = visitas_model;
