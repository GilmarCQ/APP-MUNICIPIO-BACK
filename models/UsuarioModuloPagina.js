const sequelize = require('sequelize');

const usuarioModuloPagina_model = (conexion) => {
    return conexion.define('usuarioModuloPagina',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'usuarioModuloPagina',
            timestamps: true,
            paranoid: true
        })
}

module.exports = usuarioModuloPagina_model;