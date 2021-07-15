const sequelize = require('sequelize');

const mascotaPropietario_model = (conexion) => {
    return conexion.define('mascotaPropietario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            tipo: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'mascotaPropietario',
            timestamps: true,
            paranoid: true
        });
};

module.exports = mascotaPropietario_model;