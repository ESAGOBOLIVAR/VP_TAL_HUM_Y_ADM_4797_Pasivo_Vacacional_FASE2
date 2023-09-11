function funcionalidadGenerarReporte10ObtenerDatosFiltrados() {
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
        let urlReporte10SinAplicarFiltro = dataTablaBasesSinAplicarFiltros[1][1];
        //@param {String} urlReporte10SinAplicarFiltro: es la url de la hoja de calculo para obtener los datos
        let data = readAllByUrl(urlReporte10SinAplicarFiltro);
        console.log("DATA COMPLETA");
        console.log(data);

        /* 
        se debe de acceder a la base de datos ESAGO DESARROLLO PASIVO VACACIONAL tomar la TABLA Bases Sin Aplicar Filtros 
        tomar la url columna B3 y acceder a la información de allí para aplicar las siguientes validaciones
        -Revisar Tipo de contrato y solo tomar lo que sea termino indefinido y fijo

        */

        let tipoContrato = "";
        //  let tipo1 = "término fijo".trim().toUpperCase();
        //  let tipo2 = "Termino Indefinido".trim().toUpperCase();
        //  let companiaOmitir = "cultivarte".trim().toUpperCase();

        //  let filtro = data.filter(el => (el[0].toString().trim().toUpperCase() != companiaOmitir && (el[0].toString().trim().toUpperCase() == tipo1 || tipo2)))



        //  //si la  data esta completa entonces insertar en la base que se creo anteriormente
        //  if (filtro.length > 0) {
        //      console.log("DATA FILTRO")
        //      console.log(filtro);
        //      console.log("INSERTAR");
        //      let urlBaseConFiltrosAplicados = dataTablaBasesConFiltrosAplicados[0][1];

        //      console.log("url base con los filtros aplicados");
        //      console.log(urlBaseConFiltrosAplicados);

        //      //funcion para insertar los multiples registros en base a la url
        //      //@param {String} url:es la url de la base da datos a insertar multiples registros
        //      //@param {Array of Array} datos: es el arreglo de los datos a insertar en la hoja de calculo
        //      insertMultipleByUrl(urlBaseConFiltrosAplicados, filtro);
        //  }


    }
}