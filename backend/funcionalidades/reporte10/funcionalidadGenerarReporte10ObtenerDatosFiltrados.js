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

        let tipoContrato1 = "TERMINO FIJO".trim().toUpperCase();;
        let tipoContrato2 = "TERMINO INDEFINIDO".trim().toUpperCase();;
        let filtro = data.filter(el => (el[4].toString().trim().toUpperCase() == tipoContrato1 || el[4].toString().trim().toUpperCase() == tipoContrato2));



        //  //si la  data esta completa entonces insertar en la base que se creo anteriormente
        if (filtro.length > 0) {
            console.log("DATA FILTRO")
            console.log(filtro);
            console.log("INSERTAR");
            let urlBaseConFiltrosAplicados = dataTablaBasesConFiltrosAplicados[1][1];

            filtro.map(el => {
                let registro=el;
                let saldo = parseInt(el[8]);
                registro[8]=saldo;
            });

            console.log("FILTRO LIMPIO");
            console.log(filtro);
            //      //funcion para insertar los multiples registros en base a la url
            //      //@param {String} url:es la url de la base da datos a insertar multiples registros
            //      //@param {Array of Array} datos: es el arreglo de los datos a insertar en la hoja de calculo
            insertMultipleByUrl(urlBaseConFiltrosAplicados, filtro);
        }


    }
}