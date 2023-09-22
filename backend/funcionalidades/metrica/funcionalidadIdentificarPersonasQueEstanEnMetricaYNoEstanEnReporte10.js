//funcion para identificar las personas que estan en la metrica y no estan en el reporte 10
function funcionalidadIdentificarPersonasQueEstanEnMetricaYNoEstanEnReporte10() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados } = nameTables;

    //se obtiene la data de la base con filtros aplicados
    let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);
    //si hay datos en la base
    if (dataTablaBasesConFiltrosAplicados) {

        let urlMetrica = dataTablaBasesConFiltrosAplicados[0][1];
        let urlReporte10 = dataTablaBasesConFiltrosAplicados[1][1];
        //@param {String} urlMetricaSinAplicarFiltro: es la url de la hoja de calculo para obtener los datos
        let dataMetrica = readAllByUrl(urlMetrica);
        let dataReporte10 = readAllByUrl(urlReporte10);


        console.log("DATA COMPLETA METRICA");
        console.log(dataMetrica);

        console.log("DATA COMPLETA REPORTE 10");
        console.log(dataReporte10);

        //recorrer reporte 10
        dataReporte10.map((el, index) => {
            let idNacional = el[1].toString().trim();
            //por cada id del registro nacional se va a buscar en metrica
            let busquedaId = dataMetrica.find(el => el[4].toString().trim() == idNacional);
            //si la busqueda del id del reporte 10 en la metrica es undefine significa que no lo encontro , por lo tanto debe
            //de cambiar el color de ese registro en un color
            if (busquedaId == undefined) {
                let indice = index + 2;
                // abrir la hoja por Url
                let BD = SpreadsheetApp.openByUrl(urlReporte10);
                //acceder a la hoja activa
                const sheetHoja = BD.getActiveSheet();

                //entonces colocar en color rojo ese registro
                let rango = sheetHoja.getRange(`A${indice}:I${indice}`);

                let rangoEstadoEsago=sheetHoja.getRange(`J${indice}`);

                rangoEstadoEsago.setValue('el registro existe en reporte 10 y no en metrica');

                // Cambia el color de fondo de la fila a naranja
                rango.setBackground("#FFA500"); // En este caso, el color es rojo
            }
        });

    }
}