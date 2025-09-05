const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const primos = [];

for (let i = 0; i < array.length; i++) {
let esPrimo = true;

if (array[i] < 2) esPrimo = false;

for (let j = 2; j <= Math.sqrt(array[i]); j++) {
    if (array[i] % j === 0) {
    esPrimo = false;
    break;
    }
}

if (esPrimo) primos.push(array[i]);
}

console.log(primos);
