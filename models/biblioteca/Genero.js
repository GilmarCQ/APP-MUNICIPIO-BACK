const sequelize = require('sequelize');

const genero_model = (conexion) => {
    return conexion.define('genero',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'genero',
            paranoid: true,
            timestamps: true
        });
}
module.exports = genero_model;
