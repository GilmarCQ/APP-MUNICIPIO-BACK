const sequelize = require('sequelize');

const asociacion_model = (conexion) => {
    return conexion.define('asociacion',
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
            tableName: 'asociacion',
            paranoid: true,
            timestamps: true
        });
};
module.exports = asociacion_model;
