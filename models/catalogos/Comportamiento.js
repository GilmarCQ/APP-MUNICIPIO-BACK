const sequelize = require('sequelize');

const comportamiento_model = (conexion) => {
    return conexion.define('comportamiento',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'comportamiento',
            timestamps: true,
            paranoid: true
        })
}
module.exports = comportamiento_model;