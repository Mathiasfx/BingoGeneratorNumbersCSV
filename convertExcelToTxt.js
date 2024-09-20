const XLSX = require('xlsx');
const fs = require('fs');

// Cargar el archivo Excel
const workbook = XLSX.readFile('preguntas/preguntas.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convertir las celdas en formato de texto
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

// Crear el archivo de texto
let txtContent = '';
data.forEach(entry => {
  const question = entry['PREGUNTA'];
  const options = [entry['OPCION 1'], entry['OPCION 2'], entry['OPCION 3'], entry['OPCION 4']];
  const correctAnswer = entry['RESPUESTA CORRECTA'];

  txtContent += `${question};\n${options.join(';\n')};\n${correctAnswer};\n|\n`;
});

// Guardar el contenido en un archivo de texto
fs.writeFileSync('preguntas.txt', txtContent);

console.log('Archivo de texto generado exitosamente.');
