//funcion para insertar multiples registros en una sheet en base a su url
//@param {String} url:es la url de la base da datos a insertar multiples registros
//@param {Array of Array} datos: es el arreglo de los datos a insertar en la hoja de calculo
function insertMultipleByUrl(url, datos) {

    // abrir la hoja por Url
    let BD = SpreadsheetApp.openByUrl(url);

    const sheetHoja = BD.getActiveSheet();

    // Inserta los datos en la hoja de cálculo.
    sheetHoja.getRange(sheetHoja.getLastRow() + 1, 1, datos.length, datos[0].length).setValues(datos);

}