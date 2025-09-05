let edadPasajero = 17;
let conAcompanante = true;
const precioPasaje = 1000;
const ciudadDestino = "Sucre";
const ciudadesDisponibles = new Array("Santiago", "Paris", "Tokio", "Buenos Aires", "Lima", "Montevideo", "Sucre");

if (precioPasaje === 1000){

    console.log(`el pasaje cuesta 1000`);
}

console.log(`Verificando pasaje para ${ciudadDestino}`);

if (ciudadesDisponibles.indexOf(ciudadDestino) >= -1 && edadPasajero >= 18 || conAcompanante ){
    console.log('pasaje disponible');
} else{
    console.log('pasaje no disponible');
}