const sequelize = require('sequelize');

const salaReserva_model = (conexion) => {
    return conexion.define('salaReserva',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'salaReserva',
            paranoid: true,
            timestamps: true
        });
}
module.exports = salaReserva_model;
