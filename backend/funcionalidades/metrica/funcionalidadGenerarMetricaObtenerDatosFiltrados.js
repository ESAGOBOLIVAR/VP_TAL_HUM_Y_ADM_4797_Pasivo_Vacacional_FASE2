
//funcion para realizar filtros de las bases de datos para migrar en las plantillas
function funcionalidadGenerarMetricaObtenerDatosFiltrados() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados, tablaBasesSinAplicarFiltros } = nameTables;

    //se obtiene la data de la base sin aplicar filtros
    let dataTablaBasesSinAplicarFiltros = readAllArray([tablaBasesSinAplicarFiltros, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesSinAplicarFiltros = JSON.parse(dataTablaBasesSinAplicarFiltros);


    //se obtiene la data de la base con filtros aplicados
    let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);

    //si hay data
    if (dataTablaBasesSinAplicarFiltros) {
        let urlMetricaSinAplicarFiltro = dataTablaBasesSinAplicarFiltros[0][1];
        //@param {String} urlMetricaSinAplicarFiltro: es la url de la hoja de calculo para obtener los datos
        let data = readAllByUrl(urlMetricaSinAplicarFiltro);
        console.log("DATA COMPLETA");
        console.log(data);

        //recorrer la data para obtener Solo relacionar, Tipo de contrato a término fijo e indefinido Columna J
        // No tener en cuenta lo que sea CULTIVARTE es decir omitir esto Columna A

        let tipo1 = "Fijo".trim().toUpperCase();
        let tipo2 = "Indefinido".trim().toUpperCase();
        let companiaOmitir = "Fundacion Cultiva El Arte Y La Cultura".trim().toUpperCase();

        let filtro = data.filter(el => (el[0].toString().trim().toUpperCase() != companiaOmitir && (el[9].toString().trim().toUpperCase() == tipo1 || el[9].toString().trim().toUpperCase()==tipo2)))
        // let filtro = data.filter(el => (el[0].toString().trim().toUpperCase() != companiaOmitir)));



        //si la  data esta completa entonces insertar en la base que se creo anteriormente
        if (filtro.length > 0) {
            console.log("DATA FILTRO")
            console.log(filtro);
            console.log("INSERTAR");
            let urlBaseConFiltrosAplicados = dataTablaBasesConFiltrosAplicados[0][1];

            console.log("url base con los filtros aplicados");
            console.log(urlBaseConFiltrosAplicados);

            //funcion para insertar los multiples registros en base a la url
            //@param {String} url:es la url de la base da datos a insertar multiples registros
            //@param {Array of Array} datos: es el arreglo de los datos a insertar en la hoja de calculo
            insertMultipleByUrl(urlBaseConFiltrosAplicados, filtro);

        }
    }

}