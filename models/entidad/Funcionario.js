const sequelize = require('sequelize');
const funcionario_model = (conexion) => {
    return conexion.define('funcionario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            contrato: { type: sequelize.TEXT },
            fechaContrato: { type: sequelize.DATEONLY },
            personaId: { type: sequelize.INTEGER }
        },
        {
            tableName: 'funcionario',
            paranoid: true,
            timestamps: true
        });
}

module.exports = funcionario_model;