const sequelize = require('sequelize');

const sala_model = (conexion) => {
    return conexion.define('sala',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false },
            descripcion: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'sala',
            paranoid: true,
            timestamps: true
        })
}

module.exports = sala_model;