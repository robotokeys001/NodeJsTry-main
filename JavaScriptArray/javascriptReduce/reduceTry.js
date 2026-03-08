//.reduce() = riduce gli elementi di un'array in un singolo valore

//---------Esempio 1-----------------------------------
const price = [5, 30, 10, 25, 15, 20];

const total = price.reduce(sum);

console.log(`$${total.toFixed(2)}`);

function sum(accumulator, element){
    return accumulator + element;
}

//---------Esempio 2-----------------------------------

const scores = [75, 50, 90, 80, 65, 95];
const maximum = scores.reduce(getMax);
const minimum = scores.reduce(getMin);

console.log(maximum);
console.log(minimum);

function getMax(accumulator, element){
    return Math.max(accumulator, element);
}

function getMin(accumulator, element){
    return Math.min(accumulator, element);
}