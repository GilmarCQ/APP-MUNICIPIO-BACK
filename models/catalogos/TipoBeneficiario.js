const sequelize = require('sequelize');

const tipoBeneficiario_model = (conexion) => {
    return conexion.define('tipoBeneficiario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            nombre: {
                type: sequelize.TEXT,
                allowNull: false }
        },
        {
            tableName: 'tipoBeneficiario',
            timestamps: true,
            paranoid: true
        })
}
module.exports = tipoBeneficiario_model;