//funcion para obtener la data de una hoja de calculo por url
//@param {String} url: es la url de la hoja de calculo para obtener los datos
function readAllByUrl(url) {

    console.log(url)

    // abrir la hoja por Url
    let BD = SpreadsheetApp.openByUrl(url);

    const sheetHoja = BD.getActiveSheet();

    //arreglo de rango de datos
    const dataSheetHoja = sheetHoja.getDataRange().getValues();

    const dataSheetHojaFirstData = dataSheetHoja.shift();

    //@return {Array of Array} dataSheetHoja: es el arreglo de arreglos de los registros de la hoja de calculo activa

    return dataSheetHoja;
}