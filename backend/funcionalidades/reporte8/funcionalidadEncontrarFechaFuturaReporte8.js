//funcion para encontrar los registros con la fecha futura
function funcionalidadEncontrarFechaFuturaReporte8() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados, tablaParametrizacion } = nameTables;


    //se obtiene la data de la base con filtros aplicados
    let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);

    //acceder para obtener el mes de parametrizacion
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(tablaParametrizacion, idBaseDeDatosPasivoVacacional);

    let mesParametrizacion = sheetHoja.getRange("B6").getValue();
    console.log("MES PARAMETRIZACION");
    console.log(mesParametrizacion);



    if (dataTablaBasesConFiltrosAplicados) {
        let urlReporte8ConFiltrosAplicados = dataTablaBasesConFiltrosAplicados[2][1];
        //@param {String} urlReporte8ConFiltrosAplicados: es la url de la hoja de calculo para obtener los datos
        let data = readAllByUrl(urlReporte8ConFiltrosAplicados);

        // abrir la hoja por Url
        let BD = SpreadsheetApp.openByUrl(urlReporte8ConFiltrosAplicados);
        //acceder a la hoja activa
        const sheetHoja = BD.getActiveSheet();

        let estado1 = "Programado".toUpperCase();
        let estado2 = "En espera de aprobación".toUpperCase();
        //recorrer los registros del reporte 8
        data.map((el, index) => {
            let estado = el[10].toString().toUpperCase().trim();
            let fechaInicio = el[7]
            fechaInicio = fechaInicio.getMonth() + 1;

            //si el estado es Programado o En espera de aprobación
            if (estado == estado1 || estado == estado2) {
                //validar si es fecha futura
                console.log("registro");
                console.log(el);
                console.log("MES REGISTRO");
                console.log(fechaInicio);
                //si el mes de fecha de inicio columna H es mayor al mes de parametrizacion
                if (fechaInicio < mesParametrizacion) {
                    //colocar el registro en color naranja

                    let indice = index + 2;
                    //entonces colocar en color rojo ese registro
                    let rango = sheetHoja.getRange(`A${indice}:K${indice}`);

                    let rangoEstadoEsago=sheetHoja.getRange(`L${indice}`).setValue("no es fecha futura");

                    // Cambia el color de fondo de la fila a naranja
                    rango.setBackground("#FFA500"); // En este caso, el color es rojo

                }
            }
        })


    }
}