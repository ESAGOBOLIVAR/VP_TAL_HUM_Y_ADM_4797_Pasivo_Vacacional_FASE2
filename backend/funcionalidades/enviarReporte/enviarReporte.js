//funcion para enviar reporte
function enviarReporte() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaVicepresidencia } = nameTables;


    //se obtiene la data de la base con filtros aplicados
    let dataTablaVicepresidencia = readAllArray([tablaVicepresidencia, idBaseDeDatosPasivoVacacional]);

    dataTablaVicepresidencia = JSON.parse(dataTablaVicepresidencia);

    //recorrer la tabla vicepresidencia y solo tomar las que estan marcadas en true
    dataTablaVicepresidencia.map(el => {
        let mensaje = el[0];
        let asunto = el[1];
        let correo = el[2];
        let enviar = el[3];
        //si esta marcado entonces proceder a enviar correo electronico
        if (enviar == true) {
            enviarEmail(correo, asunto, mensaje)

        }
    })



}


