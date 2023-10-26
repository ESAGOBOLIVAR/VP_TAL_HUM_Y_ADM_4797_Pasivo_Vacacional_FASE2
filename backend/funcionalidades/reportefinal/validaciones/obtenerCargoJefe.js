//@param {String} nombreJefe: es el nombre del jefe
//@param {Array of array} dataMetricaSinFiltrar: es el arreglo de arreglo de los registros de la metrica sin filtrar
function obtenerCargoJefe(nombreJefe, dataMetricaSinFiltrar) {
    console.log("NOMBRE JEFE INMEDIATO" + nombreJefe)
    console.log("METRICA SIN FILTRAR");
    console.log(dataMetricaSinFiltrar);

    let busqueda = dataMetricaSinFiltrar.find(el => el[5].toString().trim().toUpperCase() == nombreJefe.toString().trim().toUpperCase());

    let cargoJefe = "CARGO DE JEFE NO ENCONTRADO"
    if (busqueda != undefined) {
        cargoJefe = busqueda[11];
    }
    //@return {String} cargoJefe: es el cargo del jefe
    return cargoJefe;
}