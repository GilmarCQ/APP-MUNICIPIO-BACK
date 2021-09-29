const { Area, AreaJerarquia, conexion} = require('../../config/Sequelize');
const { httpError500, httpOk200NoContent, httpOk200Content,
    httpCreated201, httpNotFound404, httpBadRequest400 } = require('../../utils/httpMessages');
const { REGISTRO_DUPLICADO, REGISTRO_CREADO, CONSULTA_SATISFACTORIA} = require('../../utils/apiMessages');

const crearArea = async (req, res) => {
    const { area } = req.body;
    const t = await conexion.transaction();
    try {
        const areaF = await findAreaByName(area.nombre);
        if (areaF) {
            httpBadRequest400(res, REGISTRO_DUPLICADO);
        } else {
            const areaC = await createArea(area, t);
            if (area.nivel > 1) {
                await createAreaJerarquia(areaC.id, area.oficinaSuperior, t);
                await t.commit();
                httpCreated201(res, areaC, REGISTRO_CREADO);
            } else {
                await t.commit();
                httpCreated201(res, areaC, REGISTRO_CREADO);
            }
        }
    } catch (e) {
        console.log(e);
        await t.rollback();
        httpError500(res, e);
    }

}
const paginarAreas = (req, res) => {
    const { order_by, sort_by, page, size } = req.query;
    Area
        .findAndCountAll({
            where: {},
            attributes: ['id', 'nombre'],
            offset: page * size,
            limit: size,
            order: [ [sort_by, order_by] ]
        })
        .then(areas => {
            const data = getPagingData(areas, page, size);
            httpOk200Content(res, data, CONSULTA_SATISFACTORIA);
        })
        .catch(error => httpError500(res, error));
}
const buscarAreaPorId = (req, res) => {
    const { id } = req.query;
    console.log(id);
    Area
        .findOne({ where: {id} })
        .then(area => httpOk200Content(res, area, CONSULTA_SATISFACTORIA))
        .catch(error => httpError500(res, error));
}
const listarAreasPorNombre = (req, res) => {
    const { nombre } = req.body;
    Area.findAll({ where: { nombre } })
        .then(areas => httpOk200Content(res, areas, CONSULTA_SATISFACTORIA))
        .catch(error => httpError500(res, error));
}
const listarAreas = (req, res) => {
    Area.findAll()
        .then(areas => httpOk200Content(res, areas, CONSULTA_SATISFACTORIA))
        .catch(error => httpError500(res, error));
}

const findAreaByName = async (nombre) => {
    let area;
    await Area.findOne({where: {nombre}})
        .then(areaF => area = areaF);
    return area;
}
const createArea = async (area, t) => {
    let areaC;
    const areaBuild = Area.build(area);
    await areaBuild.save({transaction: t})
        .then(areaCr => areaC = areaCr)
        .catch(error => console.log(error));
    return areaC;
}
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: lista } = data;
    const paginaActual = page ? +page : 0;
    const totalPaginas = Math.ceil(totalItems / limit);
    return { totalItems, lista, totalPaginas, paginaActual };
}
const createAreaJerarquia = async (areaBaseId, areaSuperiorId, t) => {
    let areaJerarquiaC;
    const areaJerarquia = { areaBaseId, areaSuperiorId };
    const areaJerarquiaBuild = AreaJerarquia.build(areaJerarquia);
    await areaJerarquiaBuild.save({transaction: t})
        .then(areaJ => areaJerarquiaC = areaJ);
    return areaJerarquiaC;
}

module.exports = {
    crearArea, paginarAreas, buscarAreaPorId, listarAreasPorNombre, listarAreas
}
