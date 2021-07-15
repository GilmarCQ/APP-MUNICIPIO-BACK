const sequelize = require('sequelize');

const observacion_model = conexion => {
    return conexion.define('observacion',
        {
            id: {
                primaryKey: true,
                timestamps: true,
                type: sequelize.INTEGER,
                allowNull: true
            },
            asunto: {
                type: sequelize.TEXT,
                allowNull: false
            },
            descripcion: {
                type: sequelize.TEXT,
                allowNull: false
            },
            fechaEmision: {
                type: sequelize.DATE,
                allowNull: false
            },
            estadoSubsanacion: {
                type: sequelize.TEXT,
                allowNull: false,
                defaultValue: 'POR SUBSANAR'
            }
        },
        {
            tableName: 'observacion',
            timestamps: true,
            paranoid: true
        })
}
module.exports = observacion_model;