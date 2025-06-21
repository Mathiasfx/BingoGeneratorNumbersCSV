const fechaString = "29/08/2025";
const partesFecha = fechaString.split("/"); // Dividir la cadena en partes

// Crear un objeto Date utilizando el formato ISO (YYYY-MM-DD) que es más confiable
const fechaISO = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
const fechaObjeto = new Date(fechaISO);

// Verificar que la fecha sea válida
if (isNaN(fechaObjeto.getTime())) {
  console.error("La fecha no es válida");
} else {
  const tiempoUnixMilisegundos = fechaObjeto.getTime();
  console.log(tiempoUnixMilisegundos);
}
