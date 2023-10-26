//trigger que se ejecutara cada 10 minutos validando la cantidad de registros a procesar
//y que la funcionalidad este true es decir este activa ¿Estas seguro de ejecutar funcionalidad para cruzar la metrica
//con reporte 10 y reporte 8
function triggerCruzarMetricaConReporte10YReporte8() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaParametrizacion } = nameTables;


    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);

    const cruzarMetricacampoCantidadDeRegistrosAProcesar = sheetHojaTablaParametrizacion.getRange("B23").getValue();
    const cruzarMetricaEjecutarFuncionalidad = sheetHojaTablaParametrizacion.getRange("C23").getValue();

    //si hay un valor entonces ejecutar la funcion
    if (cruzarMetricacampoCantidadDeRegistrosAProcesar && cruzarMetricaEjecutarFuncionalidad) {
        console.log("------------EJECUTANDO FUNCION-----------");
        console.log("---------------cruzarMetricaConReporte10YReporte8----------------");
        cruzarMetricaConReporte10YReporte8();
    }

}