const sequelize = require('sequelize');
const libroPrestamo_model = (conexion) => {
    return conexion.define('libroPrestamo',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            numeroSolicitud: {
                type: sequelize.TEXT,
                allowNull: false },
            tipo: {
                type: sequelize.CHAR(1),
                allowNull: false },
            fechaDevolucion: {
                type: sequelize.DATEONLY },
            fechaPrestamo: {
                type: sequelize.DATEONLY },
            fechaSolicitud: {
                type: sequelize.DATEONLY }
        },
        {
            tableName: 'libroPrestamo',
            timestamps: true,
            paranoid: true
        });
}
module.exports = libroPrestamo_model;
