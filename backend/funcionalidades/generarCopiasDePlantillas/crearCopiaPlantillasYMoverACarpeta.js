//@param {String} urlPlantilla: es la url de la plantilla
function crearCopiaPlantillasYMoverACarpeta(urlPlantilla) {

    // Obtén la hoja de cálculo activa
    let hojaActiva = SpreadsheetApp.openByUrl(urlPlantilla);
    // Obtén la ID de la hoja de cálculo activa
    let idHoja = hojaActiva.getId();

    // Obtén la carpeta de destino por su ID (reemplaza 'ID_DE_LA_CARPETA' con la ID de tu carpeta)
    let carpetaDestino = DriveApp.getFolderById('1JUASU8-9Wz0fCjTrOd62cOJA5g3lJ1k7');

    // Crea una copia de la hoja de cálculo
    let copiaHoja = DriveApp.getFileById(idHoja).makeCopy();

    let urlCopia = copiaHoja.getUrl();

    console.log("URL COPIA" + urlCopia)

    //se mueve a la carpeta las copias
    copiaHoja.moveTo(carpetaDestino);


    //@return {String} urlCopia: es la url de la google sheet que se creo copia por cada base de datos plantilla procesada
    return urlCopia;
}