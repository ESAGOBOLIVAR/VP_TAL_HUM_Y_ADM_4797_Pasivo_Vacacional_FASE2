//funcion para identificar las personas que estan en la metrica y no estan en el reporte 10
function funcionalidadIdentificarPersonasQueEstanEnMetricaYNoEstanEnReporet10() {
    //desestructuracion para obtener parametros globales
    let { idDataBase, nameTables } = parametrosGlobales();
    let { idBaseDeDatosPasivoVacacional } = idDataBase;
    let { tablaBasesConFiltrosAplicados } = nameTables;

     //se obtiene la data de la base con filtros aplicados
     let dataTablaBasesConFiltrosAplicados = readAllArray([tablaBasesConFiltrosAplicados, idBaseDeDatosPasivoVacacional]);

     dataTablaBasesConFiltrosAplicados = JSON.parse(dataTablaBasesConFiltrosAplicados);
}