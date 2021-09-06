const sequelize = require('sequelize');

const libro_model = (conexion) => {
    return conexion.define('libro',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            editorialId: {
                type: sequelize.INTEGER,
                allowNull: false },
            titulo: {
                type: sequelize.TEXT,
                allowNull: false },
            // autor:
            edicion: {
                type: sequelize.TEXT },
            anio: {
                type: sequelize.CHAR(4),
                allowNull: false },
            coleccion: {
                type: sequelize.TEXT },
            tomo: {
                type: sequelize.TEXT },
            lugar: {
                type: sequelize.TEXT },
            portada: {
                type: sequelize.TEXT }
        },
        {
            tableName: 'libro',
            paranoid: true,
            timestamps: true
        });
}
module.exports = libro_model;