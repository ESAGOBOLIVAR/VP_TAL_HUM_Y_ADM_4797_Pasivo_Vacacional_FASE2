//funcion para obtener los dias disfrutados de la persona y tambien sirve para obtener los dias pendientes
//@param {String} id: es el id de la persona a buscar
//@param {String} id: es el id de la persona a buscar
//@arreglo {Array of Array} arreglo: es el arreglo de arreglos recibos de los datos ya sean del antes o despues
function buscarDiasDuracionPersona(id, arreglo) {

    let idRecibido = id.toString().trim();

    let suma = 0;

    arreglo.map(el => {
        let nroIdentificacioNacional = el[3].toString().trim();
        let duracion = el[9];
        //si encuentra a la persona lo va a sumar
        if (nroIdentificacioNacional == idRecibido) {
            //sumar la duraccion de los dias disfrutados por persona
            suma = suma + duracion;
        }

    });
    //@retun {Int} suma:es la suma de la duracion, en caso que la persona no exista retorna un cero
    return suma;

}