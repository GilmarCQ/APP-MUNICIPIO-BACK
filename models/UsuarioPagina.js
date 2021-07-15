const sequelize = require('sequelize');

const usuarioPagina_model = (conexion) => {
    return conexion.define('usuarioPagina',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'usuarioPagina',
            timestamps: true,
            paranoid: true
        })
}

module.exports = usuarioPagina_model;