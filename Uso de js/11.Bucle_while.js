const ciudadesDisponibles = new Array("Santiago", "Paris", "Tokio", "Buenos Aires", "Lima", "Montevideo", "Sucre");
const precioPasaje = new Array(200, 300, 400, 500, 100, 700, 1000);
const presuDisponible = 210;
let i = 0;

while(precioPasaje[i] > presuDisponible && i < precioPasaje.length){
    i++;
}

if (i == ciudadesDisponibles.length){
    console.log('no existen pasajes');
} else {
    console.log('se puede comprar pasaje para: ' + ciudadesDisponibles[i]);
}