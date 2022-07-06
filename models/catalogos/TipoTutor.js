const sequelize = require('sequelize');

const tipoTutor_model = (conexion) => {
    return conexion.define('tipoTutor',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false },
            siglas: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'tipoTutor',
            timestamps: true,
            paranoid: true
        })
}
module.exports = tipoTutor_model;