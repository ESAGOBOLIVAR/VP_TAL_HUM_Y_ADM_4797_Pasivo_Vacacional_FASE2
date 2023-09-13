//funcion para encontrar los registros repetidos del reporte 10
function funcionalidadEncontrarRepetidosReporte10() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados } = nameTables;

    //se obtiene la data de la base con filtros aplicados
    let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);

    dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);

    //url de hoja metrica
    let urlSheetMetricaFiltrada = dataTablaBasesConFiltrosAplicados[1][1];

    if (urlSheetMetricaFiltrada) {

        let datosTabla = readAllByUrl(urlSheetMetricaFiltrada);

        console.log("DATOS DE LA TABLA");
        console.log(datosTabla);


        let arrayFilasRegistrosRepetidos = [];
        //iterar registro por registro para encontrar repetidos y almacenar las posiciones
        datosTabla.map((el, index) => {
            let id = el[1].toString().trim();
            //iterar para buscar repetido
            datosTabla.map((registro, indiceRegistro) => {
                let idSub = registro[1].toString().trim();
                //si el registro de la primera iteraccion es igual a otro
                //y si el indice del registro que se esta iterando es mayor a el primero entonces agregar
                if ((id == idSub) && indiceRegistro > index) {
                    arrayFilasRegistrosRepetidos.push(index + 2);

                    arrayFilasRegistrosRepetidos.push(indiceRegistro + 2);
                }
            });
        });

        if (arrayFilasRegistrosRepetidos.length > 0) {

            // Obténer la hoja de cálculo activa
            let hojaActiva = SpreadsheetApp.openByUrl(urlSheetMetricaFiltrada);

            const dataArreglo = new Set(arrayFilasRegistrosRepetidos);

            let resultadoIndicesRepetidos = [...dataArreglo];

            console.log("INDICES REGISTROS REPETIDOS");
            console.log(resultadoIndicesRepetidos);

            resultadoIndicesRepetidos.map(fila => {


                let filaIndice = fila.toString();


                let rango = hojaActiva.getRange(`A${filaIndice}:I${filaIndice}`);

                // Cambia el color de fondo de la fila a rojo
                rango.setBackground("#FF0000"); // En este caso, el color es rojo
            })

        }


    }
}