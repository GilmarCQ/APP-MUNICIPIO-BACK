const sequelize = require('sequelize');

const entidad_model = (conexion) => {
    return conexion.define('entidad',
        {
            id: {
                primaryKey: true,
                timestamps: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false
            },
            siglas: { type: sequelize.TEXT },
            ruc: { type: sequelize.CHAR(11) }
        },
        {
            tableName: 'entidad',
            timestamps: true,
            paranoid: true
        });
};
module.exports = entidad_model;
