const fechaString = "01/04/2025";
const partesFecha = fechaString.split("/"); // Dividir la cadena en partes

// Crear un objeto Date utilizando las partes de la fecha en el orden correcto (DD/MM/YYYY)
const fechaObjeto = new Date(
  partesFecha[2],
  partesFecha[1] - 1,
  partesFecha[0]
);

const tiempoUnixMilisegundos = fechaObjeto.getTime();

console.log(tiempoUnixMilisegundos);
