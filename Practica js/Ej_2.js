const frase = "Abdiel fue a mojar el viernes y volvio con su ojo morado";
const palabras = frase.split(' ');
let palabraLarga = "";

for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > palabraLarga.length) {
        palabraLarga = palabras[i];
    }
}

console.log(palabraLarga);
