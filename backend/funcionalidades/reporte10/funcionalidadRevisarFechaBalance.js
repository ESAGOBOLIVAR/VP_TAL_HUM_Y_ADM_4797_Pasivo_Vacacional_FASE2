//funcion para revisar la fecha de balance
function funcionalidadRevisarFechaBalance() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados } = nameTables;

    //se obtiene la data de la base con filtros aplicados
    let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);

    //url de hoja metrica
    let urlSheetReporte10Filtrado = dataTablaBasesConFiltrosAplicados[1][1];

    if (urlSheetReporte10Filtrado) {
        // abrir la hoja por Url
        let BD = SpreadsheetApp.openByUrl(urlSheetReporte10Filtrado);
        //acceder a la hoja activa
        const sheetHoja = BD.getActiveSheet();

        let datosTabla = readAllByUrl(urlSheetReporte10Filtrado);

        // let arrayFilasRegistrosRepetidos = [];
        //iterar registro por registro para encontrar repetidos y almacenar las posiciones
        //Thu Sep 30 2021 23:00:00 GMT-0500 (Colombia Standard Time),
        //    Thu Jun 29 2023 23:00:00 GMT-0500 (Colombia Standard Time),
        datosTabla.map((el, index) => {
            let fechaInicioRelacionLaboral = el[5];
            let fechaCalculoBalance = el[7];

            let planAsociado = el[6];
            // Calcula la diferencia en milisegundos
            let diferenciaMilisegundos = fechaCalculoBalance - fechaInicioRelacionLaboral;

            // Convierte la diferencia en días
            let diferenciaDias = diferenciaMilisegundos / (1000 * 3600 * 24);

            let indice = index + 2;


            if ((diferenciaDias >= 0 && diferenciaDias <= 30)) {
                console.log("Menor o igual a  30 días");
                console.log("DIFERENCIA DE DIAS");
                console.log(diferenciaDias);
                console.log(el);
                //verificar plan asociado si esta vacio
                if (!planAsociado) {
                    let columna = 9;
                    console.log("Registro vacio a actualizar columna i saldo en dias");
                    console.log(el);
                    console.log("INDICE ACTUALIZAR EN CERO");
                    console.log(indice)
                    //actualizar columna i saldo en dias en un valor de cero
                    actualizarSaldoEnDiasEnCero(sheetHoja, indice, columna)

                }
            }//si los dias son mayor o iguales a 31
            else if ((diferenciaDias >= 31)) {
                console.log("Mayor a 30 dias");
                console.log("DIFERENCIA DE DIAS");
                console.log(diferenciaDias);
                console.log(el);
                //si es mayor a 31 dias verificar si la columna planAsociado esta vacia
                // y si esta vacia entonces colocar ese registro en amarillo
                if (!planAsociado) {
                    console.log("Registro vacio superior a 30 dias es decir 31 en adelante");
                    console.log(el);
                    console.log("INDICE ACTUALIZAR CAMBIAR COLOR REGISTRO");
                    console.log(indice)
                    //entonces colocar en color rojo ese registro
                    let rango = sheetHoja.getRange(`A${indice}:I${indice}`);
                    let rangoEstadoEsago = sheetHoja.getRange(`J${indice}`).setValue("plan esta vacio diferencia de dias mayor a 31 dias");


                    // Cambia el color de fondo de la fila a amarillo
                    rango.setBackground("#FFFF00"); // En este caso, el color es rojo
                }
            }


        });
    }

}

//funcion para actualizar el valor del indice en cero
//@param {Object} sheetHoja: es la hoja activa sobre la cual actualizar 
//@param {Object} fila: es el indice de la fila actuallizar
function actualizarSaldoEnDiasEnCero(sheetHoja, fila, columna) {
    let rango = sheetHoja.getRange(fila, columna).setValue("0");
    let rangoEstado= sheetHoja.getRange(`J${fila}`).setValue("saldo actualizado en cero, plan esta vacio diferencia de dias menor o igual a 30 dias");
}




