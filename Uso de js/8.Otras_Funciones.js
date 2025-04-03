const ciudadesDisponibles = new Array("Santiago", "Paris", "Tokio", "Buenos Aires", "Lima", "Montevideo");

const paisesDisponibles = ["Colombia", "Chile", "Suiza", "Panama", "Bolivia"];

const cantidadCiudades = ciudadesDisponibles.length;

console.log(`En la lista existen ${cantidadCiudades} elementos`);
console.log(`En la lista existen ${cantidadCiudades.length} elementos`);

ciudadesDisponibles.shift();
console.log(`En la lista existen ${ciudadesDisponibles.length} elementos`);
console.log(ciudadesDisponibles);

ciudadesDisponibles.pop();
console.log(`En la lista existen ${ciudadesDisponibles.length} elementos`);
console.log(ciudadesDisponibles);

console.log(ciudadesDisponibles.sort());

console.log(`En la lista existen ${paisesDisponibles.indexOf("Suiza")}`);

const listaPaisesCiudades = paisesDisponibles.concat(ciudadesDisponibles);
console.log(listaPaisesCiudades);