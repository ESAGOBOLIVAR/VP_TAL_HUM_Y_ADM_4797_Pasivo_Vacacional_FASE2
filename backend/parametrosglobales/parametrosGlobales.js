//parametros globales de los ids
//Implementado por mauricio.araujo@servinformacion.com
function parametrosGlobales() {
  parametros = {
    //ids de las base a utilizar
    idDataBase: {
      idBaseDeDatosPasivoVacacional:
        "1IskoJgFB4QOGTspNKuoLembygORxGsrGJW1szGOe9tQ", //base de datos id
    },
    idCarpetas: {
      idCarpetaPlantillas: "176ay4Ha37AIbJe1lQwOG_uc5yHzjHgJ0",
      idCarpetaPlantillaGoogleSheetsGeneradas: "1JUASU8-9Wz0fCjTrOd62cOJA5g3lJ1k7"
    },
    //nombre de las tablas utilizar
    nameTables: {
      tablaPlantillas: "Plantillas",
      tablaBasesConFiltrosAplicados: "Bases Con Filtros Aplicados",
      tablaBasesSinAplicarFiltros: "Bases Sin Aplicar Filtros",
      tablaParametrizacion: "Parametrizacion",
      tablaPipolParther: "Pipol Parther",
      tablaBissnetPartner: "Bissnet Partner",
      tablaRango: "Rango",
      tablaJefe: "Jefe"

    },
    //nombre de los campos a actualizar
    // nameFieldUpdate: {
    //   nombreCampoActualizarId: "id",
    // },
  };

  return parametros;
}

//conexion a la base de datos
function conexionBaseDeDatos(idBaseDeDatos) {
  //const { idBaseDeDatos } = parametrosGlobales();
  //se abre la conexion de la base de datos
  const BD = SpreadsheetApp.openById(idBaseDeDatos);
  //@return {object} BD: se retorna la base de datos
  return { BD };
}

//asignar nombre
//@param {String} nombreSheet: es el nombre de la hoja de calculo
function asignarNombreHojaDeCalculo(nombreSheet = "", idBaseDeDatos = "") {
  //se obtiene la base de datos
  const { BD } = conexionBaseDeDatos(idBaseDeDatos);
  //se obtiene el nombre de la base de datos
  const sheetHoja = BD.getSheetByName(nombreSheet);
  //@return {Array} sheetHoja: hoja de la base de datos
  return [sheetHoja];
}

//funcion para obtener la primera fila de cada tabla
function obtenerPrimeraRegistroCalculo(nombreSheet, idBaseDeDatos) {
  //obtener la hoja de calculo
  const [sheetHoja] = asignarNombreHojaDeCalculo(nombreSheet, idBaseDeDatos);

  //arreglo de rango de datos
  const dataSheetHoja = sheetHoja.getDataRange().getValues();

  const dataSheetHojaFirstData = dataSheetHoja.shift();

  //@return [Array] dataSheetHojaFirstData: es el arreglo de la primera fila nombres de las columnas
  return [dataSheetHojaFirstData];
}

//ACTUALIZADA 2023
//funcion para ordenar el objeto
//@param {Array} arregloPrimeraFilaBaseDeDatos: es el arreglo de la primera fila de las columnas de la base de datos
//@param {Object} formData: son los datos del formulario en objeto
function ordenarObjeto(arregloPrimeraFilaBaseDeDatos, formData) {
  let arregloPropiedadesRecibidas = [];

  for (let key in formData) {
    arregloPropiedadesRecibidas.push(key);
  }

  //arreglo de los datos ordenados
  let arregloDatosOrdenados = [];
  arregloPrimeraFilaBaseDeDatos.map((columna) => {
    //buscar la columna en la propiedad del objeto recibido
    let busqueda = arregloPropiedadesRecibidas.find(
      (propiedad) => propiedad.trim() == columna.trim()
    );
    //si la columna se encuentra en la propiedad entonces añadirl los datos al arreglo ordenado
    if (busqueda) {
      arregloDatosOrdenados.push(formData[columna]);
    } else {
      //añadir un espacio vacio
      arregloDatosOrdenados.push("");
    }
  });

  //@return {Array} arregloDatosOrdenados: son los valoreses el objeto del formulario ordenado
  return [arregloDatosOrdenados];
}
