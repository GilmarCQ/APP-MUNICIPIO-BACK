const sequelize = require('sequelize');

const modulo_model = (conexion) => {
    return conexion.define('modulo',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: true
            },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false
            },
            url: {
                type: sequelize.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'modulo',
            timestamps: true,
            paranoid: true
        });
}

module.exports = modulo_model;
