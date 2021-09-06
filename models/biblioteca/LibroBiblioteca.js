const sequelize = require('sequelize');

const libroBiblioteca_model = (conexion) => {
    return conexion.define('libroBiblioteca',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            libroId: {
                type: sequelize.INTEGER,
                allowNull: false },
            codigo: {
                type: sequelize.TEXT,
                allowNull: false },
            ubicacion: {
                type: sequelize.TEXT,
                allowNull: false },
            fechaInventario: {
                type: sequelize.DATEONLY,
                defaultValue: null },
            codigoInventario: {
                type: sequelize.TEXT },
            estadoLibro: {
                type: sequelize.TEXT }
        },
        {
            tableName: 'libroBiblioteca',
            paranoid: true,
            timestamps: true
        })
}
module.exports = libroBiblioteca_model;