const sequelize = require('sequelize');

const mascotaObservacion_model = (conexion) => {
    return conexion.define('mascotaObservacion',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: sequelize.INTEGER
            }
        },
        {
            tableName: 'mascotaObservacion',
            timestamps: true,
            paranoid: true
        });
}
module.exports = mascotaObservacion_model;