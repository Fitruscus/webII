const ciudadDestino = "Sucre";
const ciudadesDisponibles = new Array("Santiago", "Paris", "Tokio", "Buenos Aires", "Lima", "Montevideo", "Sucre");

let edadPasajero = 17;
let compania = false;

if (edadPasajero >= 18 || compania){
    if (ciudadDestino.indexOf(ciudadDestino) > -1){
        console.log('pasaje disponible');
    } else{
        console.log('ciudad no disponible');
    }
} else{
    if (edadPasajero >= 16 && ciudadDestino == 'Sucre'){
        console.log('pasaje disponible');
    } else{
        console.log('pasajero no cumple las reglas');
    }
}