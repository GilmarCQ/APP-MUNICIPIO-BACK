const sequelize = require('sequelize');

const usuarioModulo_model = (conexion) => {
    return conexion.define('usuarioModulo',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'usuarioModulo',
            timestamps: true,
            paranoid: true
        })
}

module.exports = usuarioModulo_model;