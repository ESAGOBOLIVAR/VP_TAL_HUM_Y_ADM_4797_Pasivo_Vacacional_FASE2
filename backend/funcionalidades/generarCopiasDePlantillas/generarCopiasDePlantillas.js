function generarCopiasDePlantillas() {

    //desestructuracion para obtener parametros globales
    let { idDataBase, idCarpetas, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { idCarpetaPlantillas, idCarpetaPlantillaGoogleSheetsGeneradas } = idCarpetas;
    let { tablaPlantillas, tablaBasesConFiltrosAplicados, tablaParametrizacion } = nameTables;


    //obtener la hoja de calculo de la base de datos con los filtros aplicados
    const [sheetHojaBaseConFiltrosAplicados] = asignarNombreHojaDeCalculo(tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional);
    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);

    let dataTablaPlantilla = readAllArray([tablaPlantillas, idBaseDeDatosPasivoVacacional]);

    dataTablaPlantilla = JSON.parse(dataTablaPlantilla);

    //recorrer los registros de las 3 plantillas
    let arregloUrls = dataTablaPlantilla.map(el => {
        let urlPlantilla = el[1];
        let urlArchivo = crearCopiaPlantillasYMoverACarpeta(urlPlantilla, idCarpetaPlantillaGoogleSheetsGeneradas);
        //@return {String} urlCopia: es la url de la google sheet que se creo copia por cada base de datos plantilla procesada

        return urlArchivo;
    });


    //si hay urls generadas
    if (arregloUrls) {
        console.log("URLS FINALES");
        console.log(arregloUrls);
        //asignar valores a ese rango
        //funcion de revision de uso
        revisarUso([idBaseDeDatosPasivoVacacional], "VIC_TAL_HUM_Y_ADM_ESA_GOO_1012", "Fase 2 de pasivo vacacional");


        //colocar valores en la hoja de calculo
        arregloUrls.map((registro, index) => {
            console.log(index);

            let fila = index + 2;
            if (index >= 0 && index <= 2) { //solo tomaria los siguientes adjuntos
                console.log("INDICE MENOR-> " + index);
                /* 
            Plantilla Metrica Q2 julio de 2023
            Plantilla  10. BALANCE Y PASIVO VACACIONAL
            Plantilla 08. Reporte De Vacaciones SB*/
                let rango = sheetHojaBaseConFiltrosAplicados.getRange(fila, 2).setValue(registro);
            } else {
                //entrar a la hoja parametrizacion y colocar alli 
                let rango = sheetHojaTablaParametrizacion.getRange("B1").setValue(registro);
            }

        })

    }

}



