const sequelize = require('sequelize');

const libroBibliotecaFavorito = (conexion) => {
    return conexion.define('libroFavorito',
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: sequelize.INTEGER,
                allowNull: false
            }
        });
}
module.exports = libroBibliotecaFavorito;