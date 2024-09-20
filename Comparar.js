const fs = require("fs");

// Ruta del archivo CSV
const filePath = "bingoFamiliar/bingoNuevo.csv";
const grupos = [];

// Lee el archivo CSV de forma asíncrona
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const csvData = data;

  const rows = csvData.split("\n");
  // Excluye el último dígito
  const truncateData = [];

  rows.map((item) => {
    truncateData.push(item.substring(0, item.length - 4));
    let grupo = item
      .substring(0, item.length - 4)
      .match(/(?:[^,]+(?:,|$)){1,27}/g);

    // Separar cada elemento en partes de 27 caracteres
    if (grupo !== null) {
      grupo = grupo.map((item) => item.split("\n"));
    } else {
      grupo = [];
    }

    for (let i = 0; i < grupo.length; i++) {
      grupos.push(grupo[i]);
    }
  });

  console.log(grupos.length);

  const hayDuplicados = tieneDuplicados2(grupos);

  console.log(hayDuplicados);
});

function tieneDuplicados2(array) {
  const mapa = {};
  for (let i = 0; i < array.length; i++) {
    if (mapa[array[i]]) {
      return true; // Se encontró un duplicado
    }
    mapa[array[i]] = true;
  }
  return false; // No se encontraron duplicados
}

function tieneDuplicados(array) {
  const duplicados = array.filter(
    (element, index) => array.indexOf(element) !== index
  );

  return duplicados.length > 0;
}
