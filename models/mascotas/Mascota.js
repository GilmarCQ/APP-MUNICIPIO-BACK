const sequelize = require('sequelize');

const mascota_model = conexion => {
    return conexion.define('mascota',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false },
            edad: {
                type: sequelize.SMALLINT,
                allowNull: false },
            color: {
                type: sequelize.TEXT,
                allowNull: false },
            tamanio: {
                type: sequelize.TEXT,
                allowNull: false },
            genero: {
                type: sequelize.TEXT,
                allowNull: false },
            raza: {
                type: sequelize.TEXT,
                allowNull: false },
            especie: {
                type: sequelize.TEXT,
                allowNull: false },
            esterilizado: {
                type: sequelize.BOOLEAN,
                allowNull: false },
            foto: {
                type: sequelize.TEXT,
                allowNull: false },
            registro: {
                type: sequelize.INTEGER,
                allowNull: false },
            tipoRegistro: {
                type: sequelize.TEXT,
                allowNull: false,
                defaultValue: 'VIRTUAL' },
            fechaRegistro: {
                type: sequelize.DATE,
                allowNull: false,
                defaultValue: sequelize.NOW },
            fechaRevision: {
                type: sequelize.DATE,
                allowNull: false,
                defaultValue: sequelize.NOW },
            estadoRegistro: {
                type: sequelize.TEXT,
                allowNull: false,
                defaultValue: 'ENVIADO' },
            caracteristicas: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'mascota',
            timestamps: true,
            paranoid: true
        })
}
module.exports = mascota_model;