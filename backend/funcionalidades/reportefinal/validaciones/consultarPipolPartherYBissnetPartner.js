//funcion para retornar la pipol parther y bissnet parther en base a la vicepresidencia
//@param {String} vicepresidencia: es la vicepresidencia para consultar el pipol parther y bissnet partner
//@param {Array of Array} dataTablaPipolParther: es el arreglo de los datos de la tabla Pipol Parther
//@param {Array of Array} dataTablaBissnetPartner: es el arreglo de los datos de la tabla Bissnet Parther
function consultarPipolPartherYBissnetPartner(vicepresidencia, dataTablaPipolParther, dataTablaBissnetPartner) {

    let vicepresidenciaBuscar = vicepresidencia.toString().trim().toUpperCase();
    let pipolParther = dataTablaPipolParther.find(el => el[0].toString().trim().toUpperCase() == vicepresidenciaBuscar);
    let bissnetParther = dataTablaBissnetPartner.find(el => el[0].toString().trim().toUpperCase() == vicepresidenciaBuscar);

    pipolParther = pipolParther ? pipolParther[1] : "Sin datos";
    bissnetParther = bissnetParther ? bissnetParther[1] : "Sin datos";

    //@return {String} pipolParther: es el nombre de la persona encargada de esa vicepresidencia de pipolParther
    //@return {String} bissnetParther: es el nombre de la persona encargada de esa vicepresidencia de bissnetParther
    return [pipolParther, bissnetParther];

}