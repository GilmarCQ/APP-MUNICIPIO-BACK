const sequelize = require('sequelize');
const libroReserva_model = (conexion) => {
    return conexion.define('libroReserva',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'libroReserva',
            paranoid: true,
            timestamps: true
        });
}

module.exports = libroReserva_model;