//funcion para enviar reporte
function enviarReporte() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaVicepresidencia } = nameTables;

    const [sheetHojaTablaVicrepresidencia] = asignarNombreHojaDeCalculo(tablaVicepresidencia, idBaseDeDatosPasivoVacacional);


    //se obtiene la data de la base con filtros aplicados
    let dataTablaVicepresidencia = readAllArray([tablaVicepresidencia, idBaseDeDatosPasivoVacacional]);

    dataTablaVicepresidencia = JSON.parse(dataTablaVicepresidencia);

    //limpiar las columnas antes de ejecutar el proceso
    limpiarColumnaEstadoTablaVicepresidencia(dataTablaVicepresidencia, sheetHojaTablaVicrepresidencia);
    //recorrer la tabla vicepresidencia y solo tomar las que estan marcadas en true
    dataTablaVicepresidencia.map((el, index )=> {
        let indice = index + 2;
        let mensaje = el[0];
        let asunto = el[1];
        let correo = el[2];
        let enviar = el[3];
        //si esta marcado entonces proceder a enviar correo electronico
        if (enviar == true) {
            let response = enviarEmail(correo, asunto, mensaje);

            response = JSON.parse(response);

            let estado = "Envio correcto";
            console.log("RESPUESTA");
            console.log(response);
            //si hay un error al enviar el correo
            if (response == "error") {
                estado = "No se pudo enviar el correo"
            }

            sheetHojaTablaVicrepresidencia.getRange(`E${indice}`).setValue(estado);

            //si se envia correctamente
            //colocar una columna estado

        }
    });

}

//funcion para limpiar la columna estado de la tabla Vicepresidencia
//@param {Array of array} dataTablaVicepresidencia: es la data de la vicepresidencia 
//@param {Object} sheetHojaTablaVicrepresidencia: es la hoja de la vicepresidencia
function limpiarColumnaEstadoTablaVicepresidencia(dataTablaVicepresidencia, sheetHojaTablaVicrepresidencia) {

    dataTablaVicepresidencia.map((el, index) => {
        let indice = index + 2;
        console.log("INDICE A LIMPIAR");
        console.log(indice);

        sheetHojaTablaVicrepresidencia.getRange(`E${indice}`).setValue("");
    });

}


