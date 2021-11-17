const sequelize = require('sequelize');

const tipoEmpadronado_model = (conexion) => {
    return conexion.define('tipoEmpadronado',
        {
            id: {
                type: sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            }
        });
}
