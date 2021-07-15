const sequelize = require('sequelize');

const moduloPagina_model = (conexion) => {
    return conexion.define('moduloPagina',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'moduloPagina',
            timestamps: true,
            paranoid: true
        })
}

module.exports = moduloPagina_model;