function encontrarNumeroMasRepetido(lista) {
    let conteo = {}, maxNum = null, maxFrecuencia = 0;

    for (let num of lista) {
        conteo[num] = (conteo[num] || 0) + 1;
        if (conteo[num] > maxFrecuencia) {
            maxFrecuencia = conteo[num];
            maxNum = num;
        }
    }

    return maxNum;
}

let lista = [3, 5, 3, 2, 8, 3, 2, 5, 5, 5, 7, 8, 8, 8, 8];
console.log("Número más repetido:", encontrarNumeroMasRepetido(lista));
