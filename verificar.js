const timestamp = 1767052800000;
const fecha = new Date(timestamp);
console.log("Timestamp:", timestamp);
console.log("Fecha:", fecha.toISOString());
console.log("Fecha local:", fecha.toLocaleDateString());
console.log("Fecha UTC:", fecha.toUTCString());
