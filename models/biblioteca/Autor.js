const sequelize = require('sequelize');
const autor_model = (conexion) => {
    return conexion.define('autor',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombres: {
                type: sequelize.TEXT,
                allowNull: false },
            pseudonimo: {
                type: sequelize.TEXT,
                allowNull: false },
            nacionalidad: {
                type: sequelize.TEXT },
            correo: {
                type: sequelize.TEXT }
        },
        {
            tableName: 'autor',
            timestamps: true,
            paranoid: true
        });
}
module.exports = autor_model;