
const httpError500 = (res, error) => {
    res.status(500).json({error});
}
const httpError400 = (res, error, mensaje) => {
    res.status(400).json({
        error, mensaje});
}
const httpOk200NoContent = (res, message) => {
    res.status(200).json({
        valido: true,
        mensaje: message
    });
}
/*
* content
* */
const httpOk200Content = (res, content, message) => {
    res.status(200).json({
        valido: true,
        contenido: content,
        mensaje: message
    });
}
const httpOk200OnlyContent = (res, content, message) => {
    res.status(200).json({
        valido: true,
        contenido: content,
        mensaje: message
    });
}
const httpCreated201 = (res, content, message) => {
    res.status(201).json({
        valido: true,
        contenido: content,
        mensaje: message
    });
}
const httpBadRequest400 = (res, message) => {
    res.status(400).json({
        valido: false,
        mensaje: message
    })
}
const httpNotFound404 = (res, message) => {
    res.status(404).json({
        valido: false,
        mensaje: message
    })
}
module.exports = {
    httpError500, httpCreated201, httpOk200NoContent,
    httpOk200Content, httpBadRequest400, httpNotFound404,
    httpError400
}