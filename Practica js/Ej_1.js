const numeros = [1, 2, 3, 4, 5, 6];
let resultado = { pares: 0, impares: 0 };

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        resultado.pares++;
    } else {
        resultado.impares++;
    }
}

console.log(resultado);
