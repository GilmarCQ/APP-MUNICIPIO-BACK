const sequelize = require('sequelize');

const persona_model = (conexion) => {
    return conexion.define('persona',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            tipoDocumento: {
                type: sequelize.TEXT,
                allowNull: false },
            numeroDocumento: {
                type: sequelize.TEXT,
                allowNull: false },
            nombres: {
                type: sequelize.TEXT,
                allowNull: false },
            apellidoPaterno: {
                type: sequelize.TEXT,
                allowNull: false },
            apellidoMaterno: {
                type: sequelize.TEXT,
                allowNull: false },
            direccion: { type: sequelize.TEXT },
            direccionAlternativa: { type: sequelize.TEXT },
            correo: { type: sequelize.TEXT },
            telefono: { type: sequelize.CHAR(10) },
            celular: { type: sequelize.CHAR(10) },
            fechaNacimiento: { type: sequelize.DATEONLY() },
            genero: { type: sequelize.CHAR(6) },
            edad: { type: sequelize.CHAR(3) },
            tipoPoblado: {
                type: sequelize.TEXT,
                defaultValue: 'URBANO' },
            zona: { type: sequelize.TEXT },
            manzana: { type: sequelize.TEXT },
            lote: { type: sequelize.TEXT },
            kilometro: { type: sequelize.TEXT },
            comite: { type: sequelize.TEXT },
            sector: { type: sequelize.TEXT },
            usuario: { type: sequelize.TEXT }
        },
        {
            tableName: 'persona',
            timestamps: true,
            paranoid: true
        });
};

module.exports = persona_model;
