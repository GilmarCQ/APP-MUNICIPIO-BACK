const sequelize = require('sequelize');

const editorial_model = (conexion) => {
    return conexion.define('editorial',
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
            timestamps: true,
            paranoid: true,
            tableName: 'editorial'
        });
}
module.exports = editorial_model;