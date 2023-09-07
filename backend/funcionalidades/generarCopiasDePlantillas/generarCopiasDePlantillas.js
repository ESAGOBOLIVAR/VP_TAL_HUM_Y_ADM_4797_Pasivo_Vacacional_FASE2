function generarCopiasDePlantillas() {

    //desestructuracion para obtener parametros globales
    let { idDataBase, idCarpetas, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { idCarpetaPlantillas, idCarpetaPlantillaGoogleSheetsGeneradas } = idCarpetas;
    let { tablaPlantillas, tablaBasesConFIltrosAplicados } = nameTables;


    //obtener la hoja de calculo de la base de datos con los filtros aplicados
    const [sheetHojaBaseConFiltrosAplicados] = asignarNombreHojaDeCalculo(tablaBasesConFIltrosAplicados, idBaseDeDatosPasivoVacacional);

    let dataTablaPlantilla = readAllArray([tablaPlantillas, idBaseDeDatosPasivoVacacional]);

    dataTablaPlantilla = JSON.parse(dataTablaPlantilla);

    //recorrer los registros de las 3 plantillas
    let arregloUrls = dataTablaPlantilla.map(el => {
        let urlPlantilla = el[1];
        let urlArchivo = crearCopiaPlantillasYMoverACarpeta(urlPlantilla);
        //@return {String} urlCopia: es la url de la google sheet que se creo copia por cada base de datos plantilla procesada

        return urlArchivo;
    });


    //si hay urls generadas
    if (arregloUrls) {
        console.log("URLS FINALES");
        console.log(arregloUrls);
        //asignar valores a ese rango

        //colocar valores en la hoja de calculo
        arregloUrls.map((registro, index) => {
            let fila = index + 2;
            let rango = sheetHojaBaseConFiltrosAplicados.getRange(fila, 2).setValue(registro);
        })

    }

}



