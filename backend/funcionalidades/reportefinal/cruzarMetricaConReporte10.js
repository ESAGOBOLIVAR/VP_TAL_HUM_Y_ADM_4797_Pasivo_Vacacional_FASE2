function cruzarMetricaConReporte10() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados, tablaPipolParther, tablaBissnetPartner, tablaRango, tablaParametrizacion, tablaJefe } = nameTables;


    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);
    const reporteGeneral = sheetHojaTablaParametrizacion.getRange("B1").getValue();

    //se obtiene la data de la base con filtros aplicados
    let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);
    let dataTablaPipolParther = readAllArray([tablaPipolParther, idBaseDeDatosPasivoVacacional]);
    let dataTablaBissnetPartner = readAllArray([tablaBissnetPartner, idBaseDeDatosPasivoVacacional]);
    let dataTablaRango = readAllArray([tablaRango, idBaseDeDatosPasivoVacacional]);
    // let dataTablaJefe = readAllArray([tablaJefe, idBaseDeDatosPasivoVacacional]);

    dataTablaPipolParther = JSON.parse(dataTablaPipolParther);
    dataTablaBissnetPartner = JSON.parse(dataTablaBissnetPartner);
    dataTablaRango = JSON.parse(dataTablaRango);
    // dataTablaJefe = JSON.parse(dataTablaJefe);



    dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);

    let urlMetricaFiltrado = dataTablaBasesConFiltrosAplicados[0][1];
    let urlSheetReporte10Filtrado = dataTablaBasesConFiltrosAplicados[1][1];
    let arregloRegistrosReporteFinal = [];

    //si hay url en la de la metrica y reporte filtrado en la metrica tabla Bases Con Filtros Aplicados
    if (urlMetricaFiltrado && urlSheetReporte10Filtrado) {

        let datosTablaMetrica = readAllByUrl(urlMetricaFiltrado);
        let datosTablaReporte10Filtrado = readAllByUrl(urlSheetReporte10Filtrado);



        //recorrer registro de la tabla Metrica
        datosTablaMetrica.map(elementoRegistroMetrica => {
            let idMetrica = elementoRegistroMetrica[4];
            let nombre = elementoRegistroMetrica[5];
            let nombreJefeInmediato = elementoRegistroMetrica[10];
            let cargoFuncionario = elementoRegistroMetrica[11];
            let correoCorporativoJefe = elementoRegistroMetrica[12];
            let gerencia = elementoRegistroMetrica[7];
            let vicepresidencia = elementoRegistroMetrica[6];

            let [pipolParther, bissnetPartner] = consultarPipolPartherYBissnetPartner(vicepresidencia, dataTablaPipolParther, dataTablaBissnetPartner);
            let diasPendientesPorDisfrutar = 0;

            //se busca en el reporte 10 el registro de la metrica en caso de encontrarlo tomar la columna saldo en dias para colocar en saldo en dias
            //y en caso contrario colocar dias pendientes en cero
            /* 
            se entiende por regla que si una persona no está en el reporte 10 pero si está en la métrica, 
            puede ser que no tenga pasivo vacacional en la columna K del reporte final queda en cero, 
            de lo contrario tomar la columna saldo dias que ya anteriormente se había limpiado en la otra funcionalidad 
            y colocarlo en la columna K.
            */
            let busqueda = datosTablaReporte10Filtrado.find(elementoRegistroReporte10 => elementoRegistroReporte10[1].toString().trim() == idMetrica.toString().trim());

            console.log("BUSQUEDA");
            console.log(busqueda);
            //si lo encuentra
            if (busqueda != undefined) {
                let saldoEnDias = busqueda[8];
                //modificar dias pendientes por disfrutar en cero
                diasPendientesPorDisfrutar = saldoEnDias;

            }

            //obtener el rango y la meta
            let [rango, meta] = obtenerRango(diasPendientesPorDisfrutar, dataTablaRango);

            //obtener valor de pendientes meta.
            let pendientesMeta = diasPendientesPorDisfrutar - meta;

            let arregloRegistro = [idMetrica, nombre, cargoFuncionario, nombreJefeInmediato, "CARGO JEFE", correoCorporativoJefe, gerencia, vicepresidencia, pipolParther, bissnetPartner, diasPendientesPorDisfrutar, , , , rango, meta, pendientesMeta];

            console.log("--------REGISTRO-------------");
            console.log(arregloRegistro);

            arregloRegistrosReporteFinal.push(arregloRegistro);

            console.log("PENDIENTES META");
            console.log(pendientesMeta);




        });
    }

    //si hay registros en el cruce de informacion
    if (arregloRegistrosReporteFinal.length > 0 && reporteGeneral) {
        console.log("ARREGLO FINAL A INSERTAR CRUCE");
        console.log(arregloRegistrosReporteFinal);
        //insertar todos los registros en el reporte final
        insertMultipleByUrl(reporteGeneral, arregloRegistrosReporteFinal)


    }


    console.log(urlMetricaFiltrado);
    console.log("-----------");
    console.log(urlSheetReporte10Filtrado);

}

//funcion para retornar la pipol parther y bissnet parther en base a la vicepresidencia
//@param {String} vicepresidencia: es la vicepresidencia para consultar el pipol parther y bissnet partner
//@param {Array of Array} dataTablaPipolParther: es el arreglo de los datos de la tabla Pipol Parther
//@param {Array of Array} dataTablaBissnetPartner: es el arreglo de los datos de la tabla Bissnet Parther
function consultarPipolPartherYBissnetPartner(vicepresidencia, dataTablaPipolParther, dataTablaBissnetPartner) {

    let vicepresidenciaBuscar = vicepresidencia.toString().trim().toUpperCase();

    // console.log("VICEPRESIDENCIA RECIBIDA");
    // console.log(vicepresidenciaBuscar);

    // console.log("TABLA PIPOL PARTHER");
    // console.log(dataTablaPipolParther);

    let pipolParther = dataTablaPipolParther.find(el => el[0].toString().trim().toUpperCase() == vicepresidenciaBuscar);
    let bissnetParther = dataTablaBissnetPartner.find(el => el[0].toString().trim().toUpperCase() == vicepresidenciaBuscar);

    // console.log("BUSQUEDA");
    // console.log(pipolParther)


    pipolParther = pipolParther ? pipolParther[1] : "Sin datos";
    bissnetParther = bissnetParther ? bissnetParther[1] : "Sin datos";

    //@return {String} pipolParther: es el nombre de la persona encargada de esa vicepresidencia de pipolParther
    //@return {String} bissnetParther: es el nombre de la persona encargada de esa vicepresidencia de bissnetParther
    return [pipolParther, bissnetParther];

}


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

//funcion para obtener el cargo del jefe en base al correo corporativo
//@param {String} correo_corporativo: es el correo corporativo del jefe
//@param {Array of Array} dataTablaRango: es el arreglo de arreglo de los registros de la tabla Jefe
// function obtenerCargoJefe(correo_corporativo, dataTablaJefe) {

//     let cargoJefe = "SIN CARGO DE JEFE , CORREO CORPORATIVO NO ESTA EN LA TABLA JEFE";
//     let busqueda = dataTablaJefe.find(el => correo_corporativo.toUpperCase().trim() == el[0].toString().toUpperCase().trim());
//     if (busqueda != undefined) {
//         cargoJefe = busqueda[1];
//     }
//     //@return {String} cargoJefe: es el cargo del jefe
//     return [cargoJefe];
// }



