// Generar 500 combinaciones de números para el bingo con formato XX
const TOTAL_COMBINATIONS = 500;
const NUMBERS = Array.from({ length: 90 }, (_, i) =>
  i < 9 ? `0${i + 1}` : `${i + 1}`
);
const bingoCombinations = [];

for (let comboIndex = 0; comboIndex < TOTAL_COMBINATIONS; comboIndex++) {
  // Generar combinación única
  const combination = shuffle([...NUMBERS])
    .slice(0, 15)
    .sort((a, b) => a - b);

  // Insertar 12 marcadores XX en posiciones aleatorias únicas
  const xPositions = new Set();
  while (xPositions.size < 12) {
    xPositions.add(Math.floor(Math.random() * 27));
  }

  Array.from(xPositions)
    .sort((a, b) => b - a) // Orden descendente para insertar sin afectar índices
    .forEach((pos) => {
      combination.splice(pos, 0, "XX");
    });

  // Agregar número de serie con formato 0000
  combination.push(comboIndex.toString().padStart(4, "0"));
  bingoCombinations.push(combination);
}

function shuffle(array) {
  // algoritmo de Fisher-Yates para mezclar un arreglo aleatoriamente
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffle(array) {
  // Algoritmo Fisher-Yates moderno
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Convertir la matriz en una cadena de texto en formato CSV
let csv = bingoCombinations
  .map((combination) => combination.join(","))
  .join("\n");

const fs = require("fs");

// Guardar la cadena de texto en un archivo CSV
// Escribir archivo con manejo de errores mejorado
fs.writeFile("bingoNuevo.csv", csv, (err) => {
  if (err) {
    console.error("Error al guardar el archivo:", err);
    process.exit(1);
  }
  console.log(
    `Archivo guardado exitosamente. Combinaciones generadas: ${bingoCombinations.length}`
  );
});
