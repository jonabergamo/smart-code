let n1 = [2, 5, 4, 7, 3, 9];
let aux;


for (let j = 0; j < n1.length; j++){
    for (let i = 0; i < n1.length - 1; i++){
        if (n1[i] > n1[i + 1]) {
            aux = n1[i + 1]
            n1[i + 1] = n1[i]
            n1[i] = aux
        }
    }
}
console.log(n1)
