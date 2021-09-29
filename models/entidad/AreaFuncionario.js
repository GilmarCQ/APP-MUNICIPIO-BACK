const sequelize = require('sequelize');

const areaFuncionario_model = (conexion) => {
    return conexion.define('areaFuncionario',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            cargo: {
                type: sequelize.TEXT,
                allowNull: false },
            areaId: {
                type: sequelize.INTEGER,
                allowNull: false },
            funcionarioId: {
                type: sequelize.INTEGER,
                allowNull: false }
        },
        {
            tableName: 'areaFuncionario',
            timestamps: true,
            paranoid: true
        });
}
module.exports = areaFuncionario_model;
