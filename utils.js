const fechaString = "29/09/2025";
const partesFecha = fechaString.split("/"); // Dividir la cadena en partes

// Crear un objeto Date utilizando las partes de la fecha en el formato correcto (YYYY-MM-DD)
// Nota: los meses en JavaScript son 0-indexed (0-11 en lugar de 1-12)
const fechaObjeto = new Date(
  parseInt(partesFecha[2]), // Año como número entero
  parseInt(partesFecha[1]) - 1, // Mes (restamos 1 porque en JS enero es 0)
  parseInt(partesFecha[0]) // Día
);

// Verificar que la fecha sea válida
if (isNaN(fechaObjeto.getTime())) {
  console.error("La fecha no es válida");
} else {
  const tiempoUnixMilisegundos = fechaObjeto.getTime();
  console.log(tiempoUnixMilisegundos);
}
