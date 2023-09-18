function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Crea un menú en la hoja de cálculo
    ui.createMenu('Mi Menú Personalizado')
        .addItem('Generar Plantillas', 'generarCopiasDePlantillas')
        .addItem('Generar Metrica, Reporte 10 y Reporte 8 Filtrados', 'obtenerDatosFiltradosMetricaReporte10YReporte8')
        .addItem("Encontrar registros repetidos", 'encontrarRegistrosRepetidos')
        .addItem("Revisar Fecha Calculo Balance Reporte 10", 'revisarFechaCalculoBalanceYGenerarAlertaReporte10')
        .addItem("Encontrar Fecha Futura Reporte 8", 'menuEncontrarFechaFuturaReporte8')
        .addItem("Cruzar Metrica Con Reporte 10", 'menuCruzarMetricaReporte10')
        .addItem("Generacion Hacia Historico", 'generacionDeHistorico')
        .addToUi();
}


//funcion para filtrar los datos de metrica el reporte 10 y reporte 8
function obtenerDatosFiltradosMetricaReporte10YReporte8() {
    funcionalidadGenerarMetricaObtenerDatosFiltrados();
    funcionalidadGenerarReporte10ObtenerDatosFiltrados();
    funcionalidadGenerarReporte_8_ObtenerDatosFiltrados();

    SpreadsheetApp.getUi().alert(`Se han generado los reportes de Metrica, Reporte 10 y Reporte 8 Filtrados`);
}

function encontrarRegistrosRepetidos() {
    funcionalidadEncontrarRepetidosMetrica();
    funcionalidadEncontrarRepetidosReporte10();
    SpreadsheetApp.getUi().alert(`Se ha validado si existen registros repetidos sobre cada 1 de las hojas, 
    en caso de estar repetidos se agrega un color rojo y esto se aplico sobre Metrica Y Reporte 10`);

}

function revisarFechaCalculoBalanceYGenerarAlertaReporte10() {
    funcionalidadRevisarFechaBalance();
    SpreadsheetApp.getUi().alert(`Reporte 10 : Se ha verificado la fecha de calculo de balance menos la 
    fecha de inicio de relacion laboral, si el plan esta vacio,entonces aquellos registros que
     superan 31 dias en dicho calculo se han marcado de color amarillo y aquellos que son menor o 
     igual a 30 dias se ha modificado la columna saldo en dias en cero`);

}

function menuEncontrarFechaFuturaReporte8() {
    funcionalidadEncontrarFechaFuturaReporte8();
    SpreadsheetApp.getUi().alert(`Se verifica la informacion del reporte 8 filtrado en base al estado Programado y En Espera de Aprobacion
    y aquellos que son menor al mes indicado en columna B6 tabla Parametrizacion, se marcaron como color naranja`);
}


function menuCruzarMetricaReporte10() {
    cruzarMetricaConReporte10();
    SpreadsheetApp.getUi().alert(`Se ha generado sobre la plantilla del reporte final el cruze de los datos entre metrica y reporte 10`);
}

function generacionDeHistorico() {
    generarHistorico();
    SpreadsheetApp.getUi().alert(`Se ha generado la migracion del reporte final al historico`);
}




//revisar fecha calculo de balance reporte 10
//reporte 10 generacion de alerta
//funcionalidadRevisarFechaBalance
//texto: Revisar Fecha Balance Reporte 10
//texto: Se ha revisado la fecha balance del reporte 10 


function opcion2() {
    // Coloca aquí el código que deseas ejecutar cuando se selecciona la Opción 2
    SpreadsheetApp.getUi().alert('Has seleccionado la Opción 2');
}



