function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Crea un menú en la hoja de cálculo
    ui.createMenu('Menú Funcionalidades')
        .addItem('Generar Plantillas', 'generarCopiasDePlantillas')
        .addItem('Generar Metrica, Reporte 10 y Reporte 8 Filtrados', 'obtenerDatosFiltradosMetricaReporte10YReporte8')
        .addItem("Encontrar registros repetidos", 'encontrarRegistrosRepetidos')
        .addItem("Verificar registros que estan reporte 10 y no estan en la metrica", 'registrosExisteEnMetricaPeroNoExisteEnReporte10')



        .addItem("Revisar Fecha Calculo Balance Reporte 10", 'revisarFechaCalculoBalanceYGenerarAlertaReporte10')
        .addItem("Encontrar Fecha Futura Reporte 8", 'menuEncontrarFechaFuturaReporte8')
        // .addItem("Cruzar Metrica Con Reporte 10 y Reporte 8", 'menuCruzarMetricaReporte10YReporte8')
        // .addItem("Generacion Hacia Historico", 'generacionDeHistorico')
        .addToUi();

    //menu 2 para enviar reporte
    ui.createMenu('Menú Envios de Reporte')
        .addItem('Enviar Reporte', 'menuEnviarReporte')
        .addToUi();
}

//funcion para filtrar los datos de metrica el reporte 10 y reporte 8
function obtenerDatosFiltradosMetricaReporte10YReporte8() {
    funcionalidadGenerarMetricaObtenerDatosFiltrados();
    funcionalidadGenerarReporte10ObtenerDatosFiltrados();
    funcionalidadGenerarReporte_8_ObtenerDatosFiltrados();

    SpreadsheetApp.getUi().alert(`Se han generado los reportes de Metrica, Reporte 10 y Reporte 8 Filtrados`);
}

//funcion para verificar los registros que existen en metrica pero no estan en el reporte 10, se identifica aquellos que estan en el reporte 10 y no estan en metrica
function registrosExisteEnMetricaPeroNoExisteEnReporte10() {
    funcionalidadIdentificarPersonasQueEstanEnMetricaYNoEstanEnReporte10();

    SpreadsheetApp.getUi().alert(`Se ha verificado los registros de la métrica sobre el reporte 10, aquellos registros que existen en el reporte 10, pero no existen en la métrica, se han marcado sobre el reporte 10 en un color naranja`);

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


// function menuCruzarMetricaReporte10YReporte8() {
//     cruzarMetricaConReporte10YReporte8();
//     SpreadsheetApp.getUi().alert(`Se ha generado sobre la plantilla del reporte final el cruze de los datos entre metrica y reporte 10 y reporte 8`);
// }

// function generacionDeHistorico() {
//     generarHistorico();
//     SpreadsheetApp.getUi().alert(`Se ha generado la migracion del reporte final al historico`);
// }


function menuEnviarReporte() {
    enviarReporte();
    SpreadsheetApp.getUi().alert(`Se han enviado los reportes marcados en la Vicepresidencia`);

}
