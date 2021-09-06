const sequelize = require('sequelize');

const libroAutor_model = (conexion) => {
    return conexion.define('libroAutor',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false }
        },
        {
            tableName: 'libroAutor',
            timestamps: true,
            paranoid: true
        });
}
module.exports = libroAutor_model;