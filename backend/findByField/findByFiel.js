//funcion para obtener coincidencia del registro de un campo recibido con su valor correspondiente
//@param {String} nombreTabla: es el nombre de la tabla a consultar
//@param {String} idBaseDeDatos: es el id de la base de datos
//@param {String} campoRecibido: es el nombre del campo columna a que se va a tomar como referencia de llave primaria
//@param {String} valorRecibido: es el valor donde va a hacer coincidencia con el campo recibido
function findByField(argumentos) {
  try {
    // console.log(argumentos);
    let [nombreTabla, idBaseDeDatos, campoRecibido, valorRecibido] = argumentos;

    //si todo sale bien
    //obtener la hoja de calculo y asignar el nombre de la hoja de calculo
    const [sheetHoja] = asignarNombreHojaDeCalculo(nombreTabla, idBaseDeDatos);

    //campo convertido
    let campo = JSON.parse(campoRecibido);

    let valor = JSON.parse(valorRecibido);

    console.log("NOMBRE nombreTabla" + nombreTabla);
    console.log("NOMBRE idBaseDeDatos" + idBaseDeDatos);
    console.log("NOMBRE campoRecibido" + campo);
    console.log("NOMBRE valorRecibido" + valor);

    //arreglo de rango de datos
    const dataSheetHoja = sheetHoja.getDataRange().getValues();

    //obtener la primera fila de la tabla
    //[columna1,columna2,columna3]
    let [arregloPrimeraFilaBaseDeDatos] = obtenerPrimeraRegistroCalculo(
      nombreTabla,
      idBaseDeDatos
    );

    let posicionIdentificador;
    //recorrer la primera fila de la base de datos
    arregloPrimeraFilaBaseDeDatos.map((el, index) => {
      //si la columna es igual a id entonces
      if (el == campo) {
        //posicion del id en la base de datos
        posicionIdentificador = index;
      }
    });

    //si el campo se encuentra en la base entonces es diferente de undefined
    if (posicionIdentificador != undefined) {
      //va a buscar en la hoja el campo y el valor donde haya una coincidencia
      let busquedaRegistro = dataSheetHoja.find(
        (el) => el[posicionIdentificador] == valor
      );

      //si encuentra el registro
      if (busquedaRegistro) {
        //objeto donde se almacenara el objeto para retornar del registro encontraro como propiedad : valor
        let objectoRegistroEncontrado = {};

        //recorrer la primera fila para retornar esos valores en un objeto
        arregloPrimeraFilaBaseDeDatos.map((columna, index) => {
          if (columna != "") {
            let valor = busquedaRegistro[index];
            //añadir al objeto la propiedad valor
            objectoRegistroEncontrado[columna] = valor;
          }
        });

        //@return {Object} objectoRegistroEncontrado: es el registro en formato de objeto con las propiedades y valores
        return JSON.stringify(objectoRegistroEncontrado);
      } else {
        console.log("No se encuentra el registro");

        //@return {"String"} warning: es la alerta de que el registro no se encontro
        return JSON.stringify("warning");
      }
    } else {
      console.error(
        "el campo que se esta introduciendo no existe en la primera fila de la base de datos"
      );

      //@return {"String"} error: es la alerta de que el campo que se esta introduciendo a buscar no existe en la
      //primera fila de la base de datos
      return JSON.stringify("error");
    }
  } catch (error) {
    console.error(error);
    //si ocurre algun error retorna error
    //@return {"String"} error: es la alerta de que el campo que se esta introduciendo a buscar no existe en la
    return JSON.stringify("error");
  }
}
