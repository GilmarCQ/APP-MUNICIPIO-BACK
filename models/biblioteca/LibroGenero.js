const sequelize = require('sequelize');
const libroGenero_model = (conexion) => {
    return conexion.define('libroGenere',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: 'libroGenero',
            timestamps: true,
            paranoid: true
        })
}
module.exports = libroGenero_model;