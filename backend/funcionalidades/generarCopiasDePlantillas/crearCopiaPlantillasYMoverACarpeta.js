//@param {String} urlPlantilla: es la url de la plantilla
//@param {String} idCarpetaPlantillaGoogleSheetsGeneradas: es el id de la carpeta donde van a estar las plantillas
function crearCopiaPlantillasYMoverACarpeta(urlPlantilla, idCarpetaPlantillaGoogleSheetsGeneradas) {

    // Obtén la hoja de cálculo activa
    let hojaActiva = SpreadsheetApp.openByUrl(urlPlantilla);
    // Obtén la ID de la hoja de cálculo activa
    let idHoja = hojaActiva.getId();

    // Obtén la carpeta de destino por su ID (reemplaza 'ID_DE_LA_CARPETA' con la ID de tu carpeta)
    let carpetaDestino = DriveApp.getFolderById(idCarpetaPlantillaGoogleSheetsGeneradas);

    // Crea una copia de la hoja de cálculo
    let copiaHoja = DriveApp.getFileById(idHoja).makeCopy();

    let urlCopia = copiaHoja.getUrl();

    console.log("URL COPIA" + urlCopia)

    //se mueve a la carpeta las copias
    copiaHoja.moveTo(carpetaDestino);


    //@return {String} urlCopia: es la url de la google sheet que se creo copia por cada base de datos plantilla procesada
    return urlCopia;
}