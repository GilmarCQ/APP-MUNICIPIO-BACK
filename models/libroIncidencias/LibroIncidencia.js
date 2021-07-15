const sequelize = require('sequelize');

const libroIncidencia_model = (conexion) => {
    return conexion.define('libroIncidencia',
        {
            id: {},
            serie: {},
            correlativo: {},
            fecha: {},
            descripcion: {},
            fecha: {}
        },
        {
            tableName: 'libroIncidencia',
            timestamps: true,
            paranoid: true
        })
}
module.exports = libroIncidencia_model;
