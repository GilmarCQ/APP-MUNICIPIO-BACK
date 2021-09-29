const { Libro, conexion, Editorial, LibroAutor, LibroBiblioteca, LibroGenero, Genero, Autor} = require('../../config/Sequelize');
const {
    httpError500,
    httpOk200NoContent,
    httpOk200Content,
    httpCreated201,
    httpNotFound404,
    httpBadRequest400} = require('../../utils/httpMessages');

const crearLibro = async (req, res) => {
    let libro = req.body;
    const t = await conexion.transaction();
    try {
        const libroFinded = await findLibroByTitulo(libro.titulo.toUpperCase());
        if ( libroFinded ) {
            httpBadRequest400(res, 'Registro duplicado.');
        } else {
            const editorialFinded = await findEditorialByName(libro.editorial.toUpperCase());
            if (!editorialFinded) {
                httpBadRequest400(res, 'Editorial ingresada no fue encontrado...');
            }
            libro.editorialId = editorialFinded.id;
            addLibro(libro, libro.editorialId, t)
                .then(async libroCreated => {
                    for (let i = 0; i < libro.generos.length ; i++) {
                        addLibroGeneroLiterario(libroCreated.id, libro.generos[i].id);
                    }
                    for (let i = 0; i < libro.autores.length ; i++) {
                        addLibroAutor(libroCreated.id, libro.autores[i].id);
                    }
                    for (let i = 0; i < libro.libros.length ; i++) {
                        addLibroBiblioteca(libroCreated.id, libro.libros[i]);
                    }
                    await t.commit();
                    httpOk200NoContent(res, 'Registro creado correctamente.')
                })
                .catch(async error => {
                    console.log(error);
                    httpError500(res, error);
                    await t.rollback();
                });
        }
    } catch (e) {
        console.log(e);
        httpError500(res, e);
        await t.rollback();
    }
}
const paginarLibros = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Libro
        .findAndCountAll({
            where: {},
            attributes: { exclude: ['portada'] },
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(libros => {
            const data = getPagingData(libros, page, size);
            httpOk200Content(res, data, 'Consulta realizada correctamente.');
        })
        .catch(error => httpError500(res, error));
}
const buscarLibroPorId = (req, res) => {
    const { id } = req.query;
    Libro.findOne({
        where: {id},
        include: [
            {
                model: Autor,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            },
            {
                model: Genero,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            },
            {
                model: LibroBiblioteca,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                }
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }})
        .then(libroFinded => httpOk200Content(res, libroFinded, 'Consulta realizada correctamente.'))
        .catch(error => httpError500(res, error));
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
const findLibroByTitulo = (titulo) => {
    return Libro.findOne({ where: { titulo } });
}
const findLibroById = (id, t) => {
    return Libro.findOne({ where: { id } }, { transaction: t });
}
const findEditorialByName = async (nombre) => {
    let editorial;
    await Editorial.findOne({where: {nombre}})
        .then(editorialFind => editorial = editorialFind);
    return editorial;
}
const addLibro = (libro, editorialId, t) => {
    libro.editorialId = editorialId;
    const libroBuild = Libro.build(libro);
    return libroBuild.save({transaction: t});
}
const addLibroGeneroLiterario = (libroId, generoId) => {
    const libroGeneroLiterario = {libroId, generoId};
    const libroGeneroLiterarioBuild = LibroGenero.build(libroGeneroLiterario);
    return libroGeneroLiterarioBuild.save();
}
const addLibroAutor = (libroId, autorId, t) => {
    const libroAutorBuild = LibroAutor.build({libroId, autorId});
    return libroAutorBuild.save({transaction: t});
}
const addLibroBiblioteca = (libroId, libroBiblioteca, t) => {
    if (libroBiblioteca.fechaInventario === '') {
        libroBiblioteca.fechaInventario = null;
    }
    libroBiblioteca.libroId = libroId;
    const libroBibliotecaBuild = LibroBiblioteca.build(libroBiblioteca);
    console.log(libroBibliotecaBuild);
    return libroBibliotecaBuild.save({transaction: t});
}


module.exports = {
    crearLibro, paginarLibros, buscarLibroPorId
}