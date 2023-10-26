//en base a los dias pendientes por disfrutar se obtiene el rango
//@param {Number} diasPendientesPorDisfrutar: son los dias pendientes por disfrutar de ese registro
//@param {Array of Array} dataTablaRango: es el arreglo de arreglo de los registros de la tabla Rango
function obtenerRango(diasPendientesPorDisfrutar, dataTablaRango) {
    //buscar en la tabla rango donde los dias pendientes por disfrutar sean menor o igual al valor a recibido columna (dias hasta)
    let busqueda = dataTablaRango.find(el => diasPendientesPorDisfrutar <= el[3]);
    let rango = "SIN DATOS";
    let meta = "SIN DATOS";
    if (busqueda != undefined) {
        rango = busqueda[0];
        meta = busqueda[1];
    }
    //@return {[String,String]} rango: es el texto de la columna rango
    //@return {[String,String]} meta: es el texto de la columna meta
    return [rango, meta];
}