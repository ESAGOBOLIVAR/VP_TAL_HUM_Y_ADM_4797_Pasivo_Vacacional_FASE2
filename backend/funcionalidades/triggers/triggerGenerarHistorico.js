//trigger que se ejecutara cada 10 minutos validando la cantidad de registros a procesar
//y que la funcionalidad este true es decir este activa ¿Estas seguro de ejecutar funcionalidad para migrar
//la informacion del reporte general hacia el historico

function triggerGenerarHistorico() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaParametrizacion } = nameTables;


    const [sheetHojaTablaParametrizacion] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);

    const generacionHaciaHistoricoRegistrosAProcesar = sheetHojaTablaParametrizacion.getRange("B24").getValue();
    const generacionHaciaHistoricoEjecutarFuncionalidad = sheetHojaTablaParametrizacion.getRange("C24").getValue();

    //si hay un valor entonces ejecutar la funcion
    if (generacionHaciaHistoricoRegistrosAProcesar && generacionHaciaHistoricoEjecutarFuncionalidad) {
        console.log("------------EJECUTANDO FUNCION-----------");
        console.log("---------------generarHistorico----------------");
        generarHistorico();
    }
}