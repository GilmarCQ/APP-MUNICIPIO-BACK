const sequelize = require('sequelize');

const visitante_model = (conexion) => {
    return conexion.define('visitante',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: true }
        },
        {
            timestamps: true,
            tableName: 'visitante',
            paranoid: true
        });
}
module.exports = visitante_model;
