const formatearFecha = (fecha) => {
    fecha = new Date(fecha);
    return `${formatearCaracteres(fecha.getFullYear().toString(), 4, '0')}` +
        `-${formatearCaracteres((fecha.getMonth() + 1).toString(), 2, '0')}` +
        `-${formatearCaracteres(fecha.getDate().toString(), 2, '0')}`;
}
const formatearCaracteres = (cadena, digitos, caracter) => {
    let texto = cadena;
    for (let index = cadena.toString().length; index < digitos; index++) {
        texto = caracter + texto;
    }
    return texto;
}

module.exports = {
    formatearFecha,
    formatearCaracteres
}
