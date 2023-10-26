//funcion para eliminar filas de una url de una google sheet
//@param {String} url: es la url de la hoja de calculo
//@param {Int or String} cantidad: es la cantidad hasta que fila se va a eliminar
function eliminarFilasPorUrlDeUnaGoogleSheet(url,cantidad) {
    // abrir la hoja por Url
    const BD = SpreadsheetApp.openByUrl(url);
    const sheetHoja = BD.getActiveSheet();
    //eliminar desde la fila 2 hasta
    sheetHoja.deleteRows(2, cantidad);
}
