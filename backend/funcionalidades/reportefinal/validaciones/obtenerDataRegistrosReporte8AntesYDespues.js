/* funcion para obtener aquellos registros donde el año sea menor al de la parametrizacion y las fechas futuras*/
function obtenerDataRegistrosReporte8AntesYDespues(diaPatrametrizacion, mesParametrizacion, anioParametrizacion, dataReporte8ConFiltrosAplicados) {

    // console.log("DIA->" + diaPatrametrizacion);
    // console.log("MES ->" + mesParametrizacion);
    // console.log("AÑO->" + anioParametrizacion);
    // console.log("URL RP8 ->" + urlReporteVacaciones8BaseConFiltrosAplicados);


    let arregloFiltro1Antes = [];
    let arregloFiltro2Despues = [];

    dataReporte8ConFiltrosAplicados.map(el => {
        //fecha de inicio
        // letfechaInicio = transformarFecha(el[7])
        let diaFechaInicio = el[7].getDate();
        let mesFechaInicio = el[7].getMonth() + 1;
        let anioFechaInicio = el[7].getFullYear();
        //fecha fin
        // let fechaFin = el[8];
        let mesFechaFin = el[8].getMonth() + 1;
        let anioFechaFin = el[8].getFullYear();
        let diaFechaFin = el[8].getDate();
        console.log(el);
        // console.log("FECHA DE INICIO EN DATE ->" + fechaInicio)
        console.log("FECHA DE INICIO->" + `${diaFechaInicio}---${mesFechaInicio}--${anioFechaInicio}`);
        console.log("FECHA DE FIN->" + `${diaFechaFin}---${mesFechaFin}--${anioFechaFin}`);
        //obtener registros vacaciones ya tenidas
        if (
            (anioFechaInicio <= anioParametrizacion)
            &&
            (diaFechaFin <= diaPatrametrizacion && mesFechaFin <= mesParametrizacion && anioFechaFin <= anioParametrizacion)

        ) {
            //se agregan los registros menores o igual a dicha fecha
            arregloFiltro1Antes.push(el);
        } else { //obtener vacaciones pendientes
            //se agregan los registros despues de esa fecha
            arregloFiltro2Despues.push(el);
        }

    });
    console.log("FILTRO 1 ANTES");
    console.log(arregloFiltro1Antes);
    console.log("FILTRO 2 DESPUES");
    console.log(arregloFiltro2Despues);
    //@return {Array of Array} arregloFiltro1Antes: es la data de los registros menores de las vacaciones ya tenidas menor e igual al año de parametrizacion
    //@return {Array of Array} arregloFiltro2Despues: es la data de los registros menores de las vacaciones ya tenidas 
    return [arregloFiltro1Antes, arregloFiltro2Despues];
}