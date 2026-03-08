//.filter() = crea un nuovo array filtrando via degli elementi con una callback


//----------------Esempio 1---------------------------------------

let numbers = [1, 2, 3, 4, 5, 6, 7];
let evenNums = numbers.filter(isEven);
let oddNums = numbers.filter(isOdd);

console.log(evenNums);
console.log(oddNums);

function isEven(element){
    return element % 2 === 0;
}

function isOdd(element){
    return element % 2 !==0;
}

//----------------Esempio 2---------------------------------------

let ages = [16, 17, 17, 18, 19, 20, 65];

let adults = ages.filter(isAdult);
let children = ages.filter(isChild);

console.log(adults);
console.log(children);

function isAdult(element){
    return element >= 18;
}

function isChild(element){
    return element < 18;
}

//----------------Esempio 3---------------------------------------

const words = ['apple', 'orange', 'strawberry', 'kiwi', 'banana', 'coconut'];
const longWords = words.filter(getLongWords);
const shortWords = words.filter(getShortWords);

console.log(longWords);
console.log(shortWords);

function getLongWords(element){
    return element.length > 6;
}

function getShortWords(element){
    return element.length <= 6;
}