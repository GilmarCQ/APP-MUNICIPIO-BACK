const sequelize = require('sequelize');

const areaJerarquia_model = (conexion) => {
    return conexion.define('areaJerarquia',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false },
            areaBaseId: {
                type: sequelize.INTEGER,
                allowNull: false },
            areaSuperiorId: {
                type: sequelize.INTEGER,
                allowNull: false }
        },
        {
            tableName: 'areaJerarquia',
            timestamps: true,
            paranoid: true
        });
}
module.exports = areaJerarquia_model;
