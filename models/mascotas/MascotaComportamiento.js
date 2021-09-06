const sequelize = require('sequelize');
const mascotaComportamiento_model = (conexion) => {
    return conexion.define('mascotaComportamiento',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: sequelize.INTEGER
            }
        },
        {
            tableName: 'mascotaComportamiento',
            timestamps: true,
            paranoid: true
        });
}
module.exports = mascotaComportamiento_model;
