const sequelize = require('sequelize');

const pagina_model = (conexion) => {
    return conexion.define('pagina',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
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
            tableName: 'pagina',
            timestamps: true,
            paranoid: true
        });
};

module.exports = pagina_model;