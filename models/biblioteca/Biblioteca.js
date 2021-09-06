const sequelize = require('sequelize');

const biblioteca_model = conexion => {
    return conexion.define('biblioteca',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false },
            direccion: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'biblioteca',
            paranoid: true,
            timestamps: true
        });
};
module.exports = biblioteca_model;
