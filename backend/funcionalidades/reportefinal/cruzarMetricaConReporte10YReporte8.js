//funcion para cruzar metrica con reporte 10 y reporte 8
function cruzarMetricaConReporte10YReporte8() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados, tablaPipolParther, tablaBissnetPartner, tablaRango, tablaParametrizacion, tablaBasesSinAplicarFiltros } = nameTables;


    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);
    const reporteGeneral = sheetHojaTablaParametrizacion.getRange("B1").getValue();


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

        let datosTablaMetrica = readAllByUrl(urlMetricaFiltrado);
        let datosTablaReporte10Filtrado = readAllByUrl(urlSheetReporte10Filtrado);


        // -------------------------------------//
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

            //en base al nombre del jefe inmediato proceder a buscar en la metrica no limpia para obtener el cargo de este

            let cargoJefe = obtenerCargoJefe(nombreJefeInmediato, dataTablaMetricaSinAplicarFiltros);


            //buscar el id en el reporte 8 de los datos del antes para obtener total dias disfrutados
            let diasDisfrutados = buscarDiasDuracionPersona(idMetrica, arregloFiltro1Antes);
            let diasProgramados = buscarDiasDuracionPersona(idMetrica, arregloFiltro2Despues);

            let totalDiasDisfrutadosMasProgramados = diasDisfrutados + diasProgramados;
            //buscar el id en el reporte 8 de los datos del antes para obtener total dias pendientes



            let arregloRegistro = [idMetrica, nombre, cargoFuncionario, nombreJefeInmediato, cargoJefe, correoCorporativoJefe, gerencia, vicepresidencia, pipolParther, bissnetPartner, diasPendientesPorDisfrutar, diasDisfrutados, diasProgramados, totalDiasDisfrutadosMasProgramados, rango, meta, pendientesMeta];

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
    let pipolParther = dataTablaPipolParther.find(el => el[0].toString().trim().toUpperCase() == vicepresidenciaBuscar);
    let bissnetParther = dataTablaBissnetPartner.find(el => el[0].toString().trim().toUpperCase() == vicepresidenciaBuscar);

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

/* funcion para obtener aquellos registros donde el año sea menor al de la parametrizacion y las fechas futuras*/
function obtenerDataRegistrosReporte8AntesYDespues(diaPatrametrizacion, mesParametrizacion, anioParametrizacion, dataReporte8ConFiltrosAplicados) {

    // console.log("DIA->" + diaPatrametrizacion);
    // console.log("MES ->" + mesParametrizacion);
    // console.log("AÑO->" + anioParametrizacion);
    // console.log("URL RP8 ->" + urlReporteVacaciones8BaseConFiltrosAplicados);


    let arregloFiltro1Antes = [];
    let arregloFiltro2Despues = [];

    dataReporte8ConFiltrosAplicados.map(el => {
        //fecha de inicio
        // letfechaInicio = transformarFecha(el[7])
        let diaFechaInicio = el[7].getDate();
        let mesFechaInicio = el[7].getMonth() + 1;
        let anioFechaInicio = el[7].getFullYear();
        //fecha fin
        // let fechaFin = el[8];
        let mesFechaFin = el[8].getMonth() + 1;
        let anioFechaFin = el[8].getFullYear();
        let diaFechaFin = el[8].getDate();
        console.log(el);
        // console.log("FECHA DE INICIO EN DATE ->" + fechaInicio)
        console.log("FECHA DE INICIO->" + `${diaFechaInicio}---${mesFechaInicio}--${anioFechaInicio}`);
        console.log("FECHA DE FIN->" + `${diaFechaFin}---${mesFechaFin}--${anioFechaFin}`);
        //obtener registros vacaciones ya tenidas
        if (
            (anioFechaInicio <= anioParametrizacion)
            &&
            (diaFechaFin <= diaPatrametrizacion && mesFechaFin <= mesParametrizacion && anioFechaFin <= anioParametrizacion)

        ) {
            //se agregan los registros menores o igual a dicha fecha
            arregloFiltro1Antes.push(el);
        } else { //obtener vacaciones pendientes
            //se agregan los registros despues de esa fecha
            arregloFiltro2Despues.push(el);
        }

    });
    console.log("FILTRO 1 ANTES");
    console.log(arregloFiltro1Antes);
    console.log("FILTRO 2 DESPUES");
    console.log(arregloFiltro2Despues);
    //@return {Array of Array} arregloFiltro1Antes: es la data de los registros menores de las vacaciones ya tenidas menor e igual al año de parametrizacion
    //@return {Array of Array} arregloFiltro2Despues: es la data de los registros menores de las vacaciones ya tenidas 
    return [arregloFiltro1Antes, arregloFiltro2Despues];
}

//funcion para obtener los dias disfrutados de la persona y tambien sirve para obtener los dias pendientes
//@param {String} id: es el id de la persona a buscar
//@param {String} id: es el id de la persona a buscar
//@arreglo {Array of Array} arreglo: es el arreglo de arreglos recibos de los datos ya sean del antes o despues
function buscarDiasDuracionPersona(id, arreglo) {

    let idRecibido = id.toString().trim();

    let suma = 0;

    arreglo.map(el => {
        let nroIdentificacioNacional = el[3].toString().trim();
        let duracion = el[9];
        //si encuentra a la persona lo va a sumar
        if (nroIdentificacioNacional == idRecibido) {
            //sumar la duraccion de los dias disfrutados por persona
            suma = suma + duracion;
        }

    });
    //@retun {Int} suma:es la suma de la duracion, en caso que la persona no exista retorna un cero
    return suma;

}



