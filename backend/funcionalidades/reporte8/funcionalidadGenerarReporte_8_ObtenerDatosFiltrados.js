function funcionalidadGenerarReporte_8_ObtenerDatosFiltrados() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados, tablaBasesSinAplicarFiltros, tablaParametrizacion } = nameTables;

    //se obtiene la data de la base sin aplicar filtros
    let dataTablaBasesSinAplicarFiltros = readAllArray([tablaBasesSinAplicarFiltros, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesSinAplicarFiltros = JSON.parse(dataTablaBasesSinAplicarFiltros);

    //acceder para obtener el año
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);

    let anioParametrizacion = sheetHoja.getRange("B5").getValue();
    console.log("VALOR DEL AÑO DE PARAMETRIZACION" + anioParametrizacion);
    //se obtiene la data de la base con filtros aplicados
    let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);

    //si hay data
    if (dataTablaBasesSinAplicarFiltros) {
        let urlReporte8SinAplicarFiltros = dataTablaBasesSinAplicarFiltros[2][1];
        //@param {String} urlReporte10SinAplicarFiltro: es la url de la hoja de calculo para obtener los datos
        let data = readAllByUrl(urlReporte8SinAplicarFiltros);
        console.log("DATA COMPLETA");
        console.log(data);
        let estadoAusencia = "Guardado".toUpperCase();
        //arreglo donde se almacenara la data limpia
        let arrayFiltroRegistrosLimpios = [];

        data.map(el => {
            //solo tomar  los registros que sean diferente de guardado
            if (el[10].toString().trim().toUpperCase() != estadoAusencia) {
                let fechaInicio = el[7];
                let fechaFin = el[8];


                fechaInicio = fechaInicio.getFullYear();
                fechaFin = fechaFin.getFullYear();
                //tomar los registros donde la fecha de inicio o fecha de fin sea igual al año de parametrizacion
                if (fechaInicio == anioParametrizacion || fechaFin == anioParametrizacion) {
                    //añadir filtroRegistrosLimpios
                    arrayFiltroRegistrosLimpios.push(el);
                }
            }
        });

        if (arrayFiltroRegistrosLimpios) {
            console.log("REGISTROS FILTRADOS");
            console.log(arrayFiltroRegistrosLimpios);

            let urlBaseConFiltrosAplicados = dataTablaBasesConFiltrosAplicados[2][1];

            //funcion para insertar los multiples registros en base a la url
            //@param {String} url:es la url de la base da datos a insertar multiples registros
            //@param {Array of Array} datos: es el arreglo de los datos a insertar en la hoja de calculo
            insertMultipleByUrl(urlBaseConFiltrosAplicados, arrayFiltroRegistrosLimpios);

        }


    }

}