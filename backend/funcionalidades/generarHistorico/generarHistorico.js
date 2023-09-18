//funcion para generar historico
function generarHistorico() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados, tablaPipolParther, tablaBissnetPartner, tablaRango, tablaParametrizacion, tablaJefe } = nameTables;


    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);
    const reporteGeneral = sheetHojaTablaParametrizacion.getRange("B1").getValue();
    const historico = sheetHojaTablaParametrizacion.getRange("B3").getValue();

    //obtener data del reporte general
    let dataTablaReporteGeneral = readAllByUrl(reporteGeneral);


    //insertar en la tabla historico realizar migracion

    //si hay registros en el cruce de informacion
    if (dataTablaReporteGeneral) {

        let arregloRegistros = [];

        //obtener año en numero y mes  en español en texto, del momento de ejecucion
        let [anio, mesEspaniol] = obtenerFechaEnEspanol();

        dataTablaReporteGeneral.map(el => {
            let registroRegistrar = [anio, mesEspaniol, ...el];
            //añadir al arreglo el registro con el mes y año de ejecucion
            arregloRegistros.push(registroRegistrar);

        })


        console.log("Relizar migracion de registros a historico data migrada");
        console.log(arregloRegistros);
        //insertar todos los registros en el reporte final
        insertMultipleByUrl(historico, arregloRegistros)
    }
}


//funcion para obtener la fecha en español
function obtenerFechaEnEspanol() {
    const meses = [
        'enero', 'febrero', 'marzo', 'abril',
        'mayo', 'junio', 'julio', 'agosto',
        'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    const mesEnEspanol = meses[mes];
    //@return {Number} anio: es el año actual de ejecucion
    //@return {mesEnEspanol}: es el mes actual de ejecucion en texto español
    return [anio, mesEnEspanol];
}


