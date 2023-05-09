// Generar 1500 combinaciones de números y X para el bingo sin repetir
let bingoCombinations = [];
let numbers = Array.from(Array(100), (_, i) => (i < 10 ? `0${i}` : i)); // arreglo de números del 00 al 99

for (let i = 0; i < 1500; i++) {
  let shuffledNumbers = shuffle(numbers.slice()); // hacer una copia del arreglo y mezclarlo aleatoriamente
  // let combination = shuffledNumbers.slice(0, 45);
  let combination = shuffledNumbers.slice(0, 15); // tomar los primeros 15 números del arreglo mezclado
  combination.sort((a, b) => a - b); // ordenar los números de forma ascendente
  let xIndices = getRandomIndices(12, 27); // generar 12 índices aleatorios para insertar las X

  // let xIndices = getRandomIndices(12, 27); // generar 12 índices aleatorios para insertar las X
  //CAMBIE 9 POR 27
  for (let j = 0; j < xIndices.length; j++) {
    let rowIndex = Math.floor(xIndices[j] / 9);
    let colIndex = xIndices[j] % 9;
    combination.splice(rowIndex * 9 + colIndex, 0, "XX"); // insertar una X en cada índice aleatorio generado
  }
  let counter = (i + 1).toString().padStart(4, "0"); // número de serie con 4 dígitos y ceros a la izquierda
  combination.push(counter); // agregar el número de serie a la última columna
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

function getRandomIndices(numIndices, maxIndex) {
  let indices = new Set();
  let indicesPerSection = Math.floor(numIndices / 3); // cantidad de índices por sección

  // Generar índices aleatorios para cada sección
  for (let section = 0; section < 3; section++) {
    let startIndex = section * 9; // índice inicial de la sección
    let endIndex = (section + 1) * 9; // índice final de la sección
    while (indices.size < (section + 1) * indicesPerSection) {
      let index =
        Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
      indices.add(index);
    }
  }

  // Generar índices aleatorios adicionales si numIndices no es divisible por 3
  if (numIndices % 3 !== 0) {
    let extraIndices = numIndices % 3;
    let startIndex = 0;
    let endIndex = 27;
    while (indices.size < numIndices) {
      let index =
        Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
      if (!indices.has(index)) {
        indices.add(index);
        extraIndices--;
        if (extraIndices === 0) break;
      }
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}

// Convertir la matriz en una cadena de texto en formato CSV
let csv = bingoCombinations
  .map((combination) => combination.join(","))
  .join("\n");

const fs = require("fs");

// Guardar la cadena de texto en un archivo CSV
fs.writeFile("bingoOk.csv", csv, (err) => {
  if (err) throw err;
  console.log("Archivo guardado exitosamente");
});
