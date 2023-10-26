//funcion para obtener la fecha en español
function obtenerFechaEnEspanol() {
    const meses = [
        'enero', 'febrero', 'marzo', 'abril',
        'mayo', 'junio', 'julio', 'agosto',
        'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    const mesEnEspanol = meses[mes];
    //@return {Number} anio: es el año actual de ejecucion
    //@return {mesEnEspanol}: es el mes actual de ejecucion en texto español
    return [anio, mesEnEspanol];
}