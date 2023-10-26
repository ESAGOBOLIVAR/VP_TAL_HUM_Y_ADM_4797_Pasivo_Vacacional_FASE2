//funcion para generar historico
function generarHistorico() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaParametrizacion, tablaJefe } = nameTables;


    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);
    const reporteGeneral = sheetHojaTablaParametrizacion.getRange("B1").getValue();
    const historico = sheetHojaTablaParametrizacion.getRange("B3").getValue();

    //obtener data del reporte general
    let dataTablaReporteGeneral = readAllByUrl(reporteGeneral);


    //insertar en la tabla historico realizar migracion

    //si hay registros en el cruce de informacion
    if (dataTablaReporteGeneral) {

        //24 de octubre del 2023 mauricio.araujo@servinformacion.com
        let longitudArreglo = dataTablaReporteGeneral.length;
        //fin 24 de octubre del 2023 mauricio.araujo@servinformacion.com
        let arregloRegistros = [];

        //obtener año en numero y mes  en español en texto, del momento de ejecucion
        let [anio, mesEspaniol] = obtenerFechaEnEspanol();

        //24 de octubre del 2023
        const registrosAProcesarGeneracionHaciaHistorico = sheetHojaTablaParametrizacion.getRange("B24").getValue();
        //fin 24 de octubre del 2023


        //cantidad de paquetes a procesar
        let cantidad = registrosAProcesarGeneracionHaciaHistorico;
        //si la longitud del volumen de la informacion es menor o igual a los paquetes a procesar entonces cantidad es igual a la longitud del arreglo
        if (longitudArreglo <= cantidad) {
            cantidad = longitudArreglo;

        }

        //obtener la cantidad de paquetes
        paquetes = dataTablaReporteGeneral.splice(0, cantidad);


        paquetes.map(el => {
            let registroRegistrar = [anio, mesEspaniol, ...el];
            //añadir al arreglo el registro con el mes y año de ejecucion
            arregloRegistros.push(registroRegistrar);
        });

        //si hay una url y si arreglos en la base de registros entonces
        if (reporteGeneral && arregloRegistros.length > 0) {
            console.log("Relizar migracion de registros a historico data migrada");
            console.log(arregloRegistros);
            //insertar todos los registros en el reporte final
            insertMultipleByUrl(historico, arregloRegistros);

            //eliminar filas de la base de metrica
            eliminarFilasPorUrlDeUnaGoogleSheet(reporteGeneral, cantidad);
        }



    }
}





