
//funcion para realizar filtros de las bases de datos para migrar en las plantillas
function funcionalidadGenerarMetricaObtenerDatosFiltrados() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaPlantillas, tablaBasesConFIltrosAplicados, tablaBasesSinAplicarFiltros } = nameTables;

    //se obtiene la data de la base sin aplicar filtros
    let dataTablaBasesSinAplicarFiltros = readAllArray([tablaBasesSinAplicarFiltros, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesSinAplicarFiltros = JSON.parse(dataTablaBasesSinAplicarFiltros);
    //si hay data
    if (dataTablaBasesSinAplicarFiltros) {
        let urlMetricaSinAplicarFiltro = dataTablaBasesSinAplicarFiltros[0][1];
        //@param {String} urlMetricaSinAplicarFiltro: es la url de la hoja de calculo para obtener los datos
        let data = readAllByUrl(urlMetricaSinAplicarFiltro);
        console.log("DATA COMPLETA");
        console.log(data);

        //recorrer la data para obtener Solo relacionar, Tipo de contrato a término fijo e indefinido Columna J
        // No tener en cuenta lo que sea CULTIVARTE es decir omitir esto Columna A

        let tipo1 = "término fijo".trim().toUpperCase();
        let tipo2 = "Termino Indefinido".trim().toUpperCase();
        let companiaOmitir = "cultivarte".trim().toUpperCase();

        let filtro = data.filter(el => (el[0].toString().trim().toUpperCase() != companiaOmitir && (el[0].toString().trim().toUpperCase() == tipo1 || tipo2)))

        console.log("DATA FILTRO")
        console.log(filtro);

        //si la  data esta completa entonces insertar en la base que se creo anteriormente
        if (filtro.length > 0) {
            console.log("INSERTAR")

        }


    }

}