//funcion para cruzar metrica con reporte 10 y reporte 8
function cruzarMetricaConReporte10YReporte8() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados, tablaPipolParther, tablaBissnetPartner, tablaRango, tablaParametrizacion, tablaBasesSinAplicarFiltros } = nameTables;


    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);

    const reporteGeneral = sheetHojaTablaParametrizacion.getRange("B1").getValue();
    //24 de octubre del 2023
    const registrosAProcesarMetricaReporte10y8 = sheetHojaTablaParametrizacion.getRange("B23").getValue();
    //fin 24 de octubre del 2023


    const [sheetHojaTablaBasesSinAplicarFiltros] = asignarNombreHojaDeCalculo(tablaBasesSinAplicarFiltros, idBaseDeDatosPasivoVacacional);
    const urlMetricaSinFiltrar = sheetHojaTablaBasesSinAplicarFiltros.getRange("B2").getValue();
    //data de la tabla metrica sin aplicar los filtros
    const dataTablaMetricaSinAplicarFiltros = readAllByUrl(urlMetricaSinFiltrar);

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

        let paquetes = [];

        let datosTablaMetrica = readAllByUrl(urlMetricaFiltrado);
        let datosTablaReporte10Filtrado = readAllByUrl(urlSheetReporte10Filtrado);

        //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
        const [sheetHojaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);

        const [sheetHojaBasesConFiltrosAplicados] = asignarNombreHojaDeCalculo(tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional);
        let diaPatrametrizacion = sheetHojaParametrizacion.getRange("B9").getValue();
        let mesParametrizacion = sheetHojaParametrizacion.getRange("B10").getValue();
        let anioParametrizacion = sheetHojaParametrizacion.getRange("B11").getValue();
        let urlReporteVacaciones8BaseConFiltrosAplicados = sheetHojaBasesConFiltrosAplicados.getRange("B4").getValue();
        let dataReporte8ConFiltrosAplicados = readAllByUrl(urlReporteVacaciones8BaseConFiltrosAplicados);

        //obtener registros donde se cumple el antes y despues
        let [arregloFiltro1Antes, arregloFiltro2Despues] = obtenerDataRegistrosReporte8AntesYDespues(diaPatrametrizacion, mesParametrizacion, anioParametrizacion, dataReporte8ConFiltrosAplicados);
        // -------------------------------------- //

        //24 de octubre del 2023 mauricio.araujo@servinformacion.com
        let longitudArreglo = datosTablaMetrica.length;

        //cantidad de paquetes a procesar
        let cantidad = registrosAProcesarMetricaReporte10y8;
        //si la longitud del volumen de la informacion es menor o igual a los paquetes a procesar entonces cantidad es igual a la longitud del arreglo
        if (longitudArreglo <= cantidad) {
            cantidad = longitudArreglo;

        }

        //obtener la cantidad de paquetes
        paquetes = datosTablaMetrica.splice(0, cantidad);

        //recorrer registro de la tabla Metrica
        paquetes.map(elementoRegistroMetrica => {
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
            // let pendientesMeta = diasPendientesPorDisfrutar - meta;


            //en base al nombre del jefe inmediato proceder a buscar en la metrica no limpia para obtener el cargo de este

            let cargoJefe = obtenerCargoJefe(nombreJefeInmediato, dataTablaMetricaSinAplicarFiltros);


            //buscar el id en el reporte 8 de los datos del antes para obtener total dias disfrutados
            let diasDisfrutados = buscarDiasDuracionPersona(idMetrica, arregloFiltro1Antes);
            let diasProgramados = buscarDiasDuracionPersona(idMetrica, arregloFiltro2Despues);


            // 25 de octubre del 2023  se cambia la resta por mauricio.araujo@servinformacion para restar la meta menos los dias programados
            // let pendientesMeta = `${meta - diasProgramados}`;
            //fin actualizacion 25 de octubre del 2023 

            let totalDiasDisfrutadosMasProgramados = diasDisfrutados + diasProgramados;
            //buscar el id en el reporte 8 de los datos del antes para obtener total dias pendientes
            //31 de octubre del 2023
            let pendientesMeta = `${meta - totalDiasDisfrutadosMasProgramados}`;

            //31 de octubre si pendientes meta es menor o igual a cero igualar pendientes meta a cero
            if (pendientesMeta < 0) {
                pendientesMeta = 0;
            }


            let arregloRegistro = [idMetrica, nombre, cargoFuncionario, nombreJefeInmediato, cargoJefe, correoCorporativoJefe, gerencia, vicepresidencia, pipolParther, bissnetPartner, diasPendientesPorDisfrutar, diasDisfrutados, diasProgramados, totalDiasDisfrutadosMasProgramados, rango, meta, pendientesMeta];

            console.log("--------REGISTRO-------------");
            console.log(arregloRegistro);

            arregloRegistrosReporteFinal.push(arregloRegistro);

            // console.log("PENDIENTES META");
            // console.log(pendientesMeta);


            console.log("META" + meta + "------>DIAS PROGRAMADOS---->" + diasProgramados + `RESTA-->${meta - diasProgramados}}`);

        });

        //si hay registros en el cruce de informacion y la longitud de los paquetes es mayor a cero entonces insertar en la data 
        //y eliminar los registros que se procesaron
        if (arregloRegistrosReporteFinal.length > 0 && reporteGeneral && paquetes.length > 0 && urlMetricaFiltrado && urlSheetReporte10Filtrado) {
            console.log("ARREGLO FINAL A INSERTAR CRUCE");
            console.log(arregloRegistrosReporteFinal);
            //insertar todos los registros en el reporte final
            insertMultipleByUrl(reporteGeneral, arregloRegistrosReporteFinal);
            //eliminar filas de la base de metrica
            eliminarFilasPorUrlDeUnaGoogleSheet(urlMetricaFiltrado, cantidad);
        }


        // console.log(urlMetricaFiltrado);
        // console.log("-----------");
        // console.log(urlSheetReporte10Filtrado);
    }



}







